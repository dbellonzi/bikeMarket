var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  getUsers: function(req, res) {
    User.find({}, function(err, user_list){
      if(err){
        console.log("@@@getUsers "+err);
      } else {
        console.log("@@@found user_list");
        res.json(user_list);
      }
    })
  },

  addUser: function(req, res) {
    console.log(req.body.f_name+" "+req.body.l_name)
    if (req.body.password != req.body.conf_password) {
        res.json({message: "passwords don't match"})
    }
    var newUser = new User({
        name: {
            first: req.body.f_name,
            last: req.body.l_name
        },
        email: req.body.email,
        password: req.body.password
    });
    newUser.save(function(err, User){
        if(err) {
          console.log("@@@could not add User: "+err);
            throw err;
        } else {
            console.log("@@@User saved")
            res.json(User);
        }
    });
  },

  updateUser: function(req, res) {
    console.log("@@@inside updateUser");
    console.log(req.body,"this is the body")
    User.findOneAndUpdate(
        { "_id": req.params._id }, 
        { "$set": { 
            "name.f_name": req.body.f_name,
            "name.l_name": req.body.l_name, 
            "email": req.body.email,    
            "password": req.body.password
            }
        }, {new: true},function(err, User){
      if(err) {
          console.log("@@@error updating User: "+err)
          throw err;
      } else {
          console.log("@@@updated User")
          res.json(User);
      }
    });
  },

  getUser: function(req,res) {
    console.log("@@@inside getUser");
    User.findById(req.params._id, function(err,data){
        if(err){
            console.log(err);
            throw err;
        } else {
            console.log("@@@success getUser: "+data);
            res.json(data);
        }
    })
  },
  
  deleteUser: function(req, res) {
    console.log("@@@inside deleteUser");
    User.findByIdAndRemove(req.params._id, function(err, User){
      if(err) {
          console.log(err);
          throw err;
      } else {
          console.log("@@@deleted User");
          res.json(User);
      }
    });
  },

  loginUser: function(req,res){
    console.log("@@@inside loginUser");
    console.log(req.body.email)
    User.findOne({"email": req.body.email}, function(err,data){
        
        if(err){
            console.log(err,"@@this is error")
            var message = "Error logging in";
            res.json( {message: message} )
            throw err;
        } else if (data == null) {
            var message = "invalid username";
            res.json( {message: message} )
        } else if (data['password'] != req.body.password) {
            var message2 = "password is incorrect";
            console.log(message2)
            res.json( {message: message2} )
        } else {
            console.log("@@@success loginUser: "+data);
            res.json(data);
        }
    })
  }
}
