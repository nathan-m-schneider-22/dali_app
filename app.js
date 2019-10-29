const express = require('express')
const bodyParser = require('body-parser')
var validate = require('express-validation')
const app = express()
const port = 3000
var Joi = require('joi')
var data = require('./job_data.json'); 
require("./routes.js")(app,data)
var {member_schema,job_schema,member_attribute_array,job_attribute_array} = require('./schemas.js')
app.use(bodyParser.json())

/**
 * Nathan Schneider schnei.nathan@gmail.com
 * 10/23/2019 v1.0
 */



 app.get('/', (req, res) => {
    res.send("Welcome to the API\nSee the documentation for its uses")
});

app.use(function(err, req, res, next){
    res.status(400).json(err);
  });

app.get('/members/', (req, res) => {
    if (req.query.fields){
        var new_data_list = []
        for (var member of data){
            var new_datum = {}
            for (var field_val of req.query.fields.split(",")){
                if (!(field_val in member)) {
                    res.status(400).send("Invalid field: "+field_val)
                    return 
                }
                new_datum[field_val] = member[field_val]
            }
            new_data_list.push(new_datum)
        }
    }
    else new_data_list = data
    res.send(new_data_list);
});


app.get('/members/:id', (req, res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    if (req.query.fields){
        var reduced_member = {}
        for (field_val of req.query.fields.split(",")){
            if (!(field_val in member)) {
                res.status(400).send("Invalid field: "+field_val)
                return 
            }
            reduced_member[field_val] = member[field_val]
        }
    }
    else reduced_member = member
    res.send(reduced_member);
});


app.get('/members/:id/jobs',(req, res) => {
    var member = data.find(({id}) => id == req.params.id)
    if (!member) res.status(404).send("User id not found")
    var jobs = member.jobs
    if (req.query.fields){
        var reduced_job_list = []
        for(var job of jobs){
            reduced_job = {}
            for (field of req.query.fields.split(",")){
                if (!(field_val in job)) {
                    res.status(400).send("Invalid field: "+field_val)
                    return 
                }
                reduced_job[field] = job[field]
            }
            reduced_job_list.push(short_job)
        }
    }
    else reduced_job_list = jobs
    res.send(reduced_job_list);
});

app.get('/members/:id/jobs/:job_id', (req, res) => {
    var member = data.find(({id}) => id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    var jobs = member.jobs
    var job = jobs.find(({job_id}) => job_id == req.params.job_id)
    if (!job) res.status(404).send("Job id not found")

    if (req.query.fields){
        var reduced_job = {}
        for (field of req.query.fields.split(",")){
            if (!(field_val in job)) {
                res.status(400).send("Invalid field: "+field_val)
                return 
            }
            reduced_job[field] = job[field]
        }
    }
    else reduced_job = job
    res.send(reduced_job);
});

app.post('/members', (req, res) => {
    var new_member = req.body
    console.log("here")
    var result = member_schema.validate(new_member, { presence: 'required'})
    var { value, error } = result; 
    
    if(error) {
        res.status(400).json(error)
        return
    }
    var new_id = data[data.length-1].id +1
    new_member.id = new_id
    data.push(new_member)
    res.json({message: "DALI member added", id:(new_id)})
});

  
app.post('/members/:id/jobs', (req, res) => {
    var member = data.find(({id}) => id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    var new_job = req.body
    var result = job_schema.validate(new_job,{ presence: 'required'})
    var { value, error } = result; 
    if(error) {
        res.status(400).json(error)
        return
    }
    var job_list =  member.jobs
    var new_id = job_list[job_list.length-1].job_id +1
    new_job.job_id = new_id
    job_list.push(new_job)
    res.json({message:"Job added Sucessfully", job_id:new_id})
});
    


app.patch('/members/:id' , (req,res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")
    var member_update = req.body

    var result = member_schema.validate(member_update,{ presence: 'optional' })
    var { value, error } = result; 
    if(error) {
        res.status(400).json(error)
        return
    }
    for (attribute in member_update) member[attribute] = member_update[attribute]

return res.send('Member updated with id'+req.params.id);
});

app.patch('/members/:id/jobs/:job_id' , (req,res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    var job_upate = req.body
    var result = job_schema.validate(job_upate,{ presence: 'optional' })
    var { value, error } = result; 
    if(error) {
        res.status(400).json(error)
        return
    }
    var jobs = member.jobs
    var job = jobs.find(job => job.job_id == req.params.job_id)
    if (!job) res.status(404).send("Job id not found")
    for (var attribute in job_upate) job[attribute] = job_upate[attribute]
    return res.send('Job updated with id'+req.params.job_id);
});
    
app.delete('/members/:id/', (req, res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    var job = jobs.find(job => job.job_id == req.params.job_id)
    if (!job) res.status(404).send("Job id not found")

    data = data.filter(member => member.id != req.params.id)
return res.send('Member Deleted with id'+req.params.id);
});

app.delete('/members/:id/jobs/:job_id', (req, res) => {
    var member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    member.jobs = member.jobs.filter(job => job.job_id != req.params.job_id)
return res.send('Job Deleted with id '+req.params.job_id);
});

app.listen(port, () => console.log(`API Server listening on port ${port}!`))