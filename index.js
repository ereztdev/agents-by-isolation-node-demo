const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('root empty on purpose ("PONG")')
});

app.get('/countries-by-isolation', (req, res) => {
console.log('test');
});

app.listen(3000, () => console.log('here'));