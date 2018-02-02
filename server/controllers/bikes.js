var mongoose = require('mongoose');
var Bike = mongoose.model('Bike');
var User = mongoose.model('User');

module.exports = {
  getBikes: function(req, res) {
    Bike.find({}, function(err, bike_list){
      if(err){
        console.log("@@@getBikes "+err);
      } else {
        console.log("@@@found bike_list"+bike_list);
        res.json(bike_list);
      }
    })
  },

  addBike: function(req, res) {
    //req params has ID, req body needs
    //title, description, price, location, imageURL
    console.log(req.body,"this is bike req.body")
    User.findOne({_id: req.params.id}, function(err, user){
        if(err){
            let message = "couldn't find user"
            res.json({ message: message })
            throw err;
        } else {
            var newBike = new Bike({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                location: req.body.location,
                image: req.body.image,
                _owner: req.body._owner
            });
            newBike.save(function(err, savedBike){
                if(err) {
                    console.log("@@@could not add Bike: "+err);
                    let message = "Couldn't save listing"
                    res.json({ message: message })
                    throw err;
                } else {
                    console.log("@@@Bike saved")
                    user._listings.push(savedBike);
                    user.save(function (err, updatedUser){
                        if (err) {
                            console.log('error updating user with bike')
                            let message = "Couldn't update user with listing"
                            res.json({ message: message })
                            throw err;
                        } else {
                            console.log('sending updated user')
                            res.json(updatedUser);
                        }
                    })
                }
            });
        }
    })
  },


  updateBike: function(req, res) {
    console.log("@@@inside updateBike");
    console.log(req.body,"this is the body")
    User.update({'_listings.id': req.params.id}, 
    { "$set": { 
        "_listings.$.title": req.body.title,
        "_listings.$.description": req.body.description,
        "_listings.$.price": req.body.price,
        "_listings.$.location": req.body.location,
        "_listings.$.image": req.body.image
    }}, function(err,updatedUser){
        if(err){
            console.log("Did not update correctly");
        }
        else{
            res.json(updatedUser);
        }
    })
    },

    //fetches single listing
    getBike: function(req, res) {
        console.log("@@@inside getBike"+req.params.id);
        User.findOne({'_listings.id': req.params.id}, function(err, singleBike){
            if(err){
                res.json({message: err.message});
            } else {
                res.json({data: singleBike})
            }
        });
    },

    deleteBike: function(req, res) {
        var userid = req.params.userid
        var bikeid = req.params.bikeid
        console.log("@@inside delete bike")
        console.log(userid);
        console.log(bikeid);

        User.findByIdAndUpdate(userid, { $pull: { _listings: { $elemMatch:  { _id: bikeid }}}}, { new: true }, function(err, updatedUser){
            if(err){
                console.log("Did not update correctly");
                throw err;
            }
            else{
                console.log("returning updated user");
                res.json(updatedUser);
            }
        });
    }
    // User.findOne({_id: userid}, function(err, user){
    //     console.log (user)
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("inside else")
    //         for(var i = 0; i < user._listings.length-1 ; i++){
    //             if(user._listings[i]._id = bikeid){
    //                 user._listings.splice(i,1);
    //                 console.log("spliced")
    //             }
    //         }
    //         //save user function
    //         user.save(function(err, saveduser){
    //             if(err){
    //                 console.log("error saving update")
    //             } else {
    //                 res.json(saveduser);
    //             }
    //         })
    //     }
    // });
    // }
   

//     console.log("@@inside delete bike")
//     Bike.findByIdAndRemove(req.params.bikeid, function(err, bike){
//       if(err) {
//           console.log(err);
//           throw err;
//       } else {
//           console.log("@@@deleted employee");
//           res.json(bike);
//       }
//     });
//   }

}
