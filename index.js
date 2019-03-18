require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())

const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const isolatedCountries = require('./actions/isolationFinder');
const getDistance = require('./actions/getDistance');


let agentArray = [];

/**
 * Get any file Asynchronously
 * @param path
 * @returns {Promise<any>}
 */
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject();
    }
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};


app.get('/', (req, res) => {
  res.send('root empty on purpose ("PONG")')
});

app.get('/countries-by-isolation', async (req, res, next) => {
  let all = req.headers.all;
  try {
    let data = await readFile('src/agents.json');
    let parsedData = JSON.parse(data);
    if (all && data) {
      return res.json(parsedData);
    }
    return res.json(isolatedCountries(parsedData));
  } catch (e) {
    console.log('Error');
    console.log(e);
    return res.json(e);
  }
});

app.post('/find-closest', async (req, res) => {
  try {
    let address = req.body.target_location;
    let data = await readFile('src/agents.json');
    let distanceResponse = await getDistance(JSON.parse(data), address);
    return res.json([
      {data: distanceResponse},
      distanceResponse.length > 0 ? {message: 'successfully retreived distances'} : {message: 'bad request for distance'},
      distanceResponse.length > 0 ? 200 : 422
    ]);
  } catch (e) {
    console.log('Error');
    console.log(e);
    return res.json(e);
  }
});

app.listen(3000, () => console.log('you\'re here'));