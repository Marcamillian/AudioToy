const http = require('http')
const express = require('express')

let app = express();
let server;

app.use(express.static('./public'));

server = http.createServer(app);

server.listen(8080, ()=>{console.log(`Listening on http://localhost:8080`)})
