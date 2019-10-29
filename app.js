const express = require('express')
const flat = require('flat')
const bodyParser = require('body-parser')
var validate = require('express-validation')
const app = express()
const port = 3000
var Joi = require('joi')
var data = require('./job_data.json'); 

var {member_schema,job_schema} = require('./schemas.js')

app.use(bodyParser.json())

  


app.get('/', (req, res) => {
    res.send("Welcome to the API\nSee the documentation for its uses")
});


app.get('/members/', (req, res) => {
    if (req.query.fields){
        new_data_list = []
        for (member of data){
            var new_datum = {}
            for (field_val of req.query.fields.split(",")){
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

app.get('/members/count/:attribute', (req, res) => {
    attribute_count_list = []
    for (member of data){
        if (req.params.attribute == "employer"){
            for (job of member.jobs){
                if (!attribute_count_list.find(({employer}) => employer === job.company_name)){
                    attribute_count_list.push({employer:job["company_name"],count: 0})
                }
                attribute_count_list.find(({employer}) => employer === job.company_name).count++
            }
        }
        else{
            if (!(req.params.attribute in member)){
                res.status(400).send("Invalid attribute: "+req.params.attribute)
                return
            }        
            if (!attribute_count_list.find(val => val[req.params.attribute] === member[req.params.attribute])){
                item = {}
                item[req.params.attribute] = member[req.params.attribute]
                item.count = 0
                attribute_count_list.push(item)
            }   
            attribute_count_list.find(val => val[req.params.attribute] === member[req.params.attribute]).count++    
        }
    }
    res.send((attribute_count_list));
});

app.get('/members/match/', (req, res) => {
    var matching_members = []
    for (let member of data){
        var matching = true
        for (attribute in req.query){
            if (attribute === "employer"){
                if (!member["jobs"].map((job) => job.company_name).includes(req.query[attribute])){
                    matching = false
                }
            }
            else {
                if (!(attribute in member)){
                    res.status(400).send("Invalid attribute: "+attribute)
                    return
                }
                if(member[attribute] !== req.query[attribute]){
                matching = false
                }
            }

        }
        if (matching) matching_members.push({name:member.name , id: member.id})
    }
    res.send((matching_members));
});

app.get('/members/:id', (req, res) => {
    member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    if (req.query.fields){
        shortened_member = {}
        for (field of req.query.fields.split(",")){
            if (!(field_val in member)) {
                res.status(400).send("Invalid field: "+field_val)
                return 
            }
            shortened_member[field] = member[field]
        }
    }
    else shortened_member = member

    res.send(shortened_member);
});


app.get('/members/:id/jobs',(req, res) => {
    member = data.find(({id}) => id == req.params.id)
    if (!member) res.status(404).send("User id not found")
    jobs = member.jobs
    if (req.query.fields){
        shortened_jobs = []
        for(job of jobs){
            short_job = {}
            for (field of req.query.fields.split(",")){
                if (!(field_val in job)) {
                    res.status(400).send("Invalid field: "+field_val)
                    return 
                }
                short_job[field] = job[field]
            }
            shortened_jobs.push(short_job)
        }
    }
    else shortened_jobs = jobs
    res.send(shortened_jobs);
});

app.get('/members/:id/jobs/:job_id', (req, res) => {
    member = data.find(({id}) => id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    jobs = member.jobs
    job = jobs.find(({job_id}) => job_id == req.params.job_id)
    if (!job) res.status(404).send("Job id not found")

    if (req.query.fields){
        short_job = {}
        for (field of req.query.fields.split(",")){
            if (!(field_val in job)) {
                res.status(400).send("Invalid field: "+field_val)
                return 
            }
            short_job[field] = job[field]
        }
    }
    else short_job = job
    res.send(short_job);
});

app.post('/members', (req, res) => {
    const new_member = req.body
    console.log("here")
    result = member_schema.validate(new_member, { presence: 'required'})
    const { value, error } = result; 
    
    if(error) {
        res.status(400).json(error)
        return
    }
    new_id = data[data.length-1].id +1
    new_member.id = new_id
    data.push(new_member)
    res.json({message: "DALI member added", id:(new_id)})
});

app.use(function(err, req, res, next){
    res.status(400).json(err);
  });
  
app.post('/members/:id/jobs', (req, res) => {
    member = data.find(({id}) => id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    job = req.body
    result = job_schema.validate(job,{ presence: 'required'})
    const { value, error } = result; 
    if(error) {
        res.status(400).json(error)
        return
    }
    job_list =  member.jobs
    new_id = job_list[job_list.length-1].job_id +1
    job.job_id = new_id
    job_list.push(job)
    res.json({message:"Job added Sucessfully", job_id:new_id})
});
    

app.delete('/members/:id/jobs/:job_id', (req, res) => {
    member = data.find(({id}) => id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    member = data.find(member => member.id == req.params.id)
    member.jobs = member.jobs.filter(job => job.job_id != req.params.job_id)
return res.send('Job Deleted with id '+req.params.job_id);
});

app.patch('/members/:id' , (req,res) => {
    member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")
    var member_update = req.body

    result = member_schema.validate(member_update,{ presence: 'optional' })
    const { value, error } = result; 
    if(error) {
        res.status(400).json(error)
        return
    }
    for (attribute in member_update) member[attribute] = member_update[attribute]
return res.send('Member updated with id'+req.params.id);
});

app.patch('/members/:id/jobs/:job_id' , (req,res) => {
    member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    var job_upate = req.body
    result = job_schema.validate(job_schema,{ presence: 'optional' })

    jobs = member.jobs
    job = jobs.find(job => job.job_id == req.params.job_id)
    if (!job) res.status(404).send("Job id not found")
    for (attribute in job_upate) job[attribute] = job_upate[attribute]
    return res.send('Job updated with id'+req.params.job_id);
});
    
app.delete('/members/:id/', (req, res) => {
    member = data.find(member => member.id == req.params.id)
    if (!member) res.status(404).send("User id not found")

    job = jobs.find(job => job.job_id == req.params.job_id)
    if (!job) res.status(404).send("Job id not found")

    data = data.filter(member => member.id != req.params.id)
return res.send('Member Deleted with id'+req.params.id);
});

app.listen(port, () => console.log(`API Server listening on port ${port}!`))
