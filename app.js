const express = require('express')
const bodyParser = require('body-parser')
var validate = require('express-validation')
const app = express()
const port = 3000
var Joi = require('joi')
var data = require('./data/job_data.json') 
var {member_schema,job_schema,member_attribute_array,job_attribute_array} = require('./schemas.js')
require("./routes.js")(app,data,member_attribute_array,job_attribute_array)
app.use(bodyParser.json())

/**
 * Nathan Schneider schnei.nathan@gmail.com
 * 10/23/2019 v1.0
 * app.js
 * This is a REST API made for the DALI Lab Application 
 * It reads a json of DALI Lab member data, and provides
 * endpoints for users to retrieve, add, edit, and analyze
 * the data. It uses the express library for the base of the
 * API, with Joi library for input validation. 
 */


/**
 * Welcome Page
 */
 app.get('/', (req, res) => {
    res.send("Welcome to the API\nSee the documentation for its uses")
})

/**
 * Simple Error Handling
 */
app.use(function(err, req, res, next){
    res.status(400).json(err)
  })

/**
 * Port listening, on localhost
 */
app.listen(port, () => console.log(`API Server listening on port ${port}!`))

/**
 * Responds with data for all members, user can specify fields
 * 
 * Iterates through all the data, building a new list of members
 * that contain only the given fields. 
 * To specify the fields, the user sets the fields parameter to 
 * a comma separated list of fields
 * The function will return a list of member objects in the 
 * form of a json
 */
app.get('/members/', (req, res) => {
    if (req.query.fields){ //if the user specified fields
        var new_member_list = [] //new list of members
        for (var member of data){
            var reduced_member = {} //new shortened memeber
            for (var field_val of req.query.fields.split(",")){
                if (!(field_val in member)) { //if the field doesn't exist
                    res.status(400).send({error: "Invalid field: "+field_val})
                    return 
                }
                reduced_member[field_val] = member[field_val]
            }
            new_member_list.push(reduced_member) //add the reduced member
        }
    }
    else new_member_list = data //if the user didn't specify fields

    res.json(new_member_list)
})

/**
 * For a given member with an ID, either return all the data, or specify 
 * certain fields to return. 
 * To specify the fields, the user sets the fields parameter to 
 * a comma separated list of fields
 * The function will return a member object in the 
 * form of a json
 */
app.get('/members/:id', (req, res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //if the member with that id wasn't found
        return
    }
    if (req.query.fields){ //if the user specified fields
        var reduced_member = {} //reduced member
        for (field_val of req.query.fields.split(",")){ 
            if (!(field_val in member)) { //invalid field handling
                res.status(400).send({error:"Invalid field: "+field_val})
                return 
            }
            reduced_member[field_val] = member[field_val]
        }
    } 
    else reduced_member = member //if the user didn't specify fields
    res.json(reduced_member)
})

/**
 * For a given member id, return that member's employment history
 * The user can query for specific fields, or accept the full data
 * 
 * To specify the fields, the user sets the fields parameter to 
 * a comma separated list of fields
 * The function will return a list of member objects in the 
 * form of a json
 */
app.get('/members/:id/jobs',(req, res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //if the user isn't found
        return
    }
    var jobs = member.jobs

    if (req.query.fields){ //if the user specified fields
        var reduced_job_list = [] //create a new list

        for(var job of jobs){ //create a job with fewer fields
            var reduced_job = {}

            for (var field_val of req.query.fields.split(",")){
                
                if (!(field_val in job)) { //check for invalid fields
                    res.status(400).send("Invalid field: "+field_val)
                    return 
                }

                reduced_job[field_val] = job[field_val] 
            }
            reduced_job_list.push(reduced_job)
        }
    }
    else reduced_job_list = jobs
    res.json(reduced_job_list)
})
/**
 * Responds with a specific job for a specific member id
 * in the form of a json job object. 
 * 
 * To specify the fields, the user sets the fields parameter to 
 * a comma separated list of fields
 * The function will job object in the 
 * form of a json
 */
app.get('/members/:id/jobs/:job_id', (req, res) => {
    var member = data.find(({id}) => id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //check user exists
        return
    }
    var jobs = member.jobs
    var job = jobs.find(({job_id}) => job_id == req.params.job_id)
    if (!job) {
        res.status(404).send({error:"Job id not found"}) //check that job id exists
        return
    }
    if (req.query.fields){ //if the user requests more fields
        var reduced_job = {} //make a job with reduced fields
        for (field of req.query.fields.split(",")){
            if (!(field_val in job)) { //check for field validity
                res.status(400).send({error: "Invalid field: "+field_val})
                return 
            }
            reduced_job[field] = job[field]
        }
    }
    else reduced_job = job //user did not specify fields
    res.send(reduced_job)
})

/**
 * Allows users to create new DALI Lab members by send json data
 * 
 * The json it sends is validated by the Joi library against a specified
 * schema stored in schemas.js. Each field is checked and approved, then 
 * the member is assigned a unique id and added to the list of members
 */
app.post('/members', (req, res) => {
    
    //input validation through Joi
    var new_member = req.body
    var result = member_schema.validate(new_member, { presence: 'required'})//all fields required
    var { value, error } = result
    if(error) {
        res.status(400).json(error)
        return
    }
    //assign a new id one greater than the last value in the list
    //Because we always append, deleting cannot cause duplicate ids
    var new_id = data[data.length-1].id +1
    new_member.id = new_id

    data.push(new_member)

    res.json({message: "DALI member added", id:(new_id)}) 
})

/**
 * Allows users to add jobs to specific users by sending the job json
 * 
 * The json it sends is validated by the Joi library against a specified
 * schema stored in schemas.js. Each field is checked and approved, then 
 * the job is assigned a unique id and added to the list of jobs
 */
app.post('/members/:id/jobs', (req, res) => {
    var member = data.find(({id}) => id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //check user exists 
        return
    }
    var new_job = req.body //input validation through Joi
    var result = job_schema.validate(new_job,{ presence: 'required'}) //all fields required
    var { value, error } = result 
    if(error) {
        res.status(400).json(error)
        return
    }

    
    var job_list =  member.jobs //retrieve job list
    var new_id = job_list[job_list.length-1].job_id +1 //assign new id
    new_job.job_id = new_id
    job_list.push(new_job)//add job

    res.json({message:"Job added Sucessfully", job_id:new_id})
})
    

/**
 * Allows users to selectively update the fields of a given member
 * with a specified id
 * 
 * The fields must match fields found in the Joi schema, but they 
 * are optional. 
 */
app.patch('/members/:id' , (req,res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //user 404
        return
    }
    var member_update = req.body //Joi validation
    var result = member_schema.validate(member_update,{ presence: 'optional' }) //fields are all optional
    var { value, error } = result 
    if(error) {
        res.status(400).json(error)
        return
    }

    //Update all the attributes
    for (attribute in member_update) member[attribute] = member_update[attribute]

return res.send({message:"Member updated", id : req.params.id })
})

/**
 * For a given member with a given job id, the user can 
 * update the fields of the job specifically
 * 
 * The fields must match fields found in the Joi schema, but they 
 * are optional. 
 */
app.patch('/members/:id/jobs/:job_id' , (req,res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //user must exist
        return
    }
    var jobs = member.jobs
    var job = jobs.find(job => job.job_id == req.params.job_id)
    if (!job) {
        res.status(404).send({error:"Job id not found"}) //job id must exist
        return
    }
    var job_upate = req.body //validation through the Joi library 
    var result = job_schema.validate(job_upate,{ presence: 'optional' })//fields are all optional
    var { value, error } = result 
    if(error) {
        res.status(400).json(error)
        return
    }
    
    for (var attribute in job_upate) job[attribute] = job_upate[attribute] //update fields

    return res.send({message:'Job updated with id', job_id: req.params.job_id})
})
    
/**
 * Deletes a member with id from the list of members
 * The user must exist, 
 */
app.delete('/members/:id/', (req, res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //user must exist
        return
    }
    data = data.filter(member => member.id != req.params.id) //just filter out those with that ID
return res.send({message:'Member Deleted',id:req.params.id})
})

/**
 * Deletes a specific job for a specific member, 
 * the user and job id must exist
 */
app.delete('/members/:id/jobs/:job_id', (req, res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) {
        res.status(404).send({error:"User id not found"}) //user must exist
        return
    }
    jobs = member.jobs
    var job = jobs.find(job => job.job_id == req.params.job_id)
    if (!job) {
        res.status(404).send({error:"Job id not found"}) //user must exist
        return
    }
    member.jobs = member.jobs.filter(job => job.job_id != req.params.job_id) //filter jobs
return res.send({message:"Job Deleted", job_id: req.params.job_id})
})

