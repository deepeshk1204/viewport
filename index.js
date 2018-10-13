const express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'app')));
app.use('*', express.static(path.join(__dirname, 'app')));

var httpServer = http.createServer(app);
httpServer.listen(3000,null, () =>{
    console.log('listening on port 3000')
});