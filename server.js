const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');

// two static folders, one for static and one for angular dist
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json());

// require mongoose before routes to load models
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


//run at port 3000
app.listen(port, function(){
    console.log("server is running at port "+port);
})