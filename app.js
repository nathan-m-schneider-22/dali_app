const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

var data = require('./job_data.json'); //(with path)
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Welcome to the API\nSee the documentation for its uses")
});

app.get('/members/all', (req, res) => {
    res.send((data));
});

app.get('/members/all/:attribute', (req, res) => {
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
            else if(member[attribute] !== req.query[attribute]){
                matching = false
            }
        }
        if (matching) matching_members.push(member.name)
    }
    res.send((matching_members));
});

app.get('/members/:name', (req, res) => {
    res.send(data.find(({ name }) => name === req.params.name));
});

app.get('/members/:name/:attribute', (req, res) => {
    res.send(data.find(({ name }) => name === req.params.name)[req.params.attribute]);
});

app.get('/members/:name/jobs/:company_name', (req, res) => {
    member = data.find(({ name }) => name === req.params.name)
    res.send(member.jobs.find(({company_name}) => company_name === req.params.company_name));
});

app.post('/members', (req, res) => {
    new_member = req.body
    data.push(new_member)
    res.json({message: "DALI member added"})
});

app.post('/members/:name/jobs', (req, res) => {
    job = req.body
    job_list = data.find(({ name }) => name === req.params.name)["jobs"]
    job_list.push(job)
    res.json({message:"Job added"})
});
    

app.put('/', (req, res) => {

return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
return res.send('Received a DELETE HTTP method');
});

app.listen(port, () => console.log(`API Server listening on port ${port}!`))
