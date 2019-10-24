const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

var data = require('./job_data.json'); //(with path)

app.get('/', (req, res) => {
    res.send("Welcome to the API\nSee the documentation for its uses")
});

app.get('/members/all', (req, res) => {
    res.send((data));
});

app.get('/members/all/:attribute', (req, res) => {
    if (req.params.attribute === "employers"){
        const set = new Set();
        for (let member of  data){
            console.log(member.name)
            for (var job of member.jobs){
                set.add(job.company_name)
            }
        }
        array = Array.from(set)
    }
    else{
        array = data.map((member) => member[req.params.attribute])
    }
    res.send((array));
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
    console.log(req.params.name)
    res.send(data.find(({ name }) => name === req.params.name));
});

app.get('/members/:name/:attribute', (req, res) => {
    console.log(req.params.name)
    res.send(data.find(({ name }) => name === req.params.name)[req.params.attribute]);
});

app.get('/members/:name/jobs/:company_name', (req, res) => {
    console.log(req.params.name)
    member = data.find(({ name }) => name === req.params.name)
    res.send(member.jobs.find(({company_name}) => company_name === req.params.company_name));
});


app.post('/members', (req, res) => {
     
    new_member = req.body

    console.log(new_member)
    res.json({message: "DALI member added"})
});
app.post('/members/jobs', (req, res) => {
    return res.send('Received a POST HTTP method');
});
    

app.put('/', (req, res) => {
return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
return res.send('Received a DELETE HTTP method');
});

app.listen(port, () => console.log(`API Server listening on port ${port}!`))
