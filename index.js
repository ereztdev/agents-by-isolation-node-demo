require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const isolatedCountries = require('./actions/isolationFinder');
const getDistance = require('./actions/getDistance');

let agentArray = [];

const getAgentArray = function(){
   return 'yes';
};

const readFile = (path) => {
    return new Promise((resolve, reject)=>{
        if(!path) {
            reject();
        }
        fs.readFile(path, 'utf8', (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

app.get('/', (req, res) => {
    res.send('root empty on purpose ("PONG")')
});

app.get('/countries-by-isolation', async (req, res) => {
    try {
        let data = await readFile('src/agents.json');
        return res.json(isolatedCountries(JSON.parse(data)));
    } catch(e) {
        console.log('Error');
        console.log(e);
        return res.json(e);
    }
});

app.post('/find-closest', async (req, res) =>{
    try{
        let address = req.body.target_location;
        let data = await readFile('src/agents.json');
        return res.json([{data: await getDistance(JSON.parse(data),address)},{message:'asdasdasd'}]);
    } catch (e) {
        console.log('Error');
        console.log(e);
        return res.json(e);
    }
});

app.listen(3000, () => console.log('here'));