const users = require('../controllers/users.js');
const bikes = require('../controllers/bikes.js');
const path = require('path');

module.exports = function(app){
    app.get("/users", function(req, res) {
        console.log("inside /users");
        users.getUsers(req, res);
    }),

    app.post("/user/add", function(req, res) {
        console.log("inside /user/add");
        users.addUser(req, res);
    }),

    app.put('/user/update/:_id', function(req, res) {
        users.updateUser(req, res);
    }),

    app.get('/user/:_id', function(req, res) {
        users.getUser(req, res);
    }),
    
    app.delete('/user/delete/:_id', function(req, res) {
        users.deleteUser(req, res);
    }),

    app.post("/user/login", function(req,res){
        users.loginUser(req, res);
    }),

    app.post("/user/:id/addListing/", function(req,res){
        bikes.addBike(req,res);
    })

    app.get("/bikes", function(req, res) {
        console.log("inside /bikes");
        bikes.getBikes(req, res);
    }),

    // app.post("/bike/add", function(req, res) {
    //     console.log("inside /bike/add");
    //     bikes.addBike(req, res);
    // }),

    app.put('/bike/update/:_id', function(req, res) {
        bikes.updateBike(req, res);
    }),

    app.get('/bike/:_id', function(req, res) {
        bikes.getBike(req, res);
    }),
    
    app.delete('/bike/delete/:userid/:bikeid', function(req, res) {
        bikes.deleteBike(req, res);
    }),

    app.get("*", (req, res) => { 
        res.sendFile(path.resolve("././client/dist/index.html")) 
    })

};

