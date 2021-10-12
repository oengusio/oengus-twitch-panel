const fs = require('fs');
const http = require('https');
const express = require('express');
const app = express();
const port = 8080;

const privateKey  = fs.readFileSync(`${__dirname}/./keys/selfsigned.key`, 'utf8');
const certificate = fs.readFileSync(`${__dirname}/./keys/selfsigned.crt`, 'utf8');

const credentials = {key: privateKey, cert: certificate};

const server = http.createServer(credentials, app);

app.use(express.static(`${__dirname}/../src/`))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
});
