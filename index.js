const express = require('express');
const fs = require('fs');
const app = express();

const isolatedCountries = require('./actions/isolationFinder');

app.get('/', (req, res) => {
    res.send('root empty on purpose ("PONG")')
});

app.get('/countries-by-isolation', (req, res) => {
    let agentArray = [];
    //get our array of agent objects
    fs.readFile('src/agents.json', 'utf8', function (err, data) {
        if (err) throw err;
        agentArray = JSON.parse(data);
        res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify(obj, null, 3));
        res.send(isolatedCountries(agentArray));
        res.end();//closing response flow for now, remove if we want to develop the async fs response further
    });
});

app.listen(3000, () => console.log('here'));