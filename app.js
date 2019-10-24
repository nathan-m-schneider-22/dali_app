const express = require('express')
const app = express()
const port = 3000


var json = require('./job_data.json'); //(with path)

app.get('/', (req, res) => {
     res.send('Received a GET HTTP method');
});
app.get('/members/all', (req, res) => {
    console.log(req.params.name)
    res.send(json(json));
});
app.get('/members/:name', (req, res) => {
    console.log(req.params.name)
    res.send(json.find(({ name }) => name === req.params.name));
});
app.get('/members/:name/:attribute', (req, res) => {
    console.log(req.params.name)
    res.send(json.find(({ name }) => name === req.params.name)[req.params.attribute]);
});
app.get('/members/:name/jobs/', (req, res) => {
    console.log(req.params.name)
    res.send(json.find(({ name }) => name === req.params.name)["jobs"]);
});
app.get('/members/:name/jobs/employers', (req, res) => {
    console.log(req.params.name)
    member = json.find(({ name }) => name === req.params.name)
    res.send(member["jobs"].map(job => job.company_name));
});
app.get('/members/:name/jobs/:company_name', (req, res) => {
    console.log(req.params.name)
    member = json.find(({ name }) => name === req.params.name)
    res.send(member.jobs.find(({company_name}) => company_name === req.params.company_name));
});

app.post('/', (req, res) => {
return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
return res.send('Received a DELETE HTTP method');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

