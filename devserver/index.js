const fs = require('fs');
const path = require('path');
const http = require('https');
const express = require('express');
const app = express();
const port = 8080;

const privateKey  = fs.readFileSync(path.join(__dirname, 'keys', 'selfsigned.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'keys', 'selfsigned.crt'), 'utf8');

const credentials = {key: privateKey, cert: certificate};

const server = http.createServer(credentials, app);

app.use(express.static(path.join(__dirname, '..', 'src')))

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

server.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
});
