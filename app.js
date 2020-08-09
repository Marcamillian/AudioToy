const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

let app = express();
let server;

app.use(express.static('./dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


// post endpoints
app.post('/track',(req,res)=>{

  res.redirect('/')
  //res.send({result:'OK', message: 'something done'});
})



server = http.createServer(app);

server.listen(8080, ()=>{console.log(`Listening on http://localhost:8080`)})
