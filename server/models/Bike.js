var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BikeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "missing bike name"],
        minlength: 4,
        maxlength: 30,
        trim: true
    },
    description: {
        type: String,
        required: [true, "missing description"],
        minlength: 10,
        maxlength: 200,
    },
    price: {
        type: Number,
        required: [true, "missing price"],
        trim: true,
        min: 1,
        max: 99999
    }, 
    location: {
        type: String,
        required: [true, "missing location"],
        trim: true,
        minlength: 8,
        maxlength: 30,
    },
    image: {
        type: String,
        required: [true, "missing image"],
        trim: true,
        maxlength: 200,
        validate: {
            validator: function(value) {
              return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value);
            },
            message: "Invalid image URL"
          }
    },
    _owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User'}
},
{ timestamps: true, usePushEach: true });

var Bike = mongoose.model('Bike', BikeSchema);