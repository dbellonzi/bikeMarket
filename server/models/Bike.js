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
        maxlength: 300,
    },
    price: {
        type: String,
        required: [true, "missing price"],
        trim: true,
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
        required: [true, "missing price"],
        trim: true,
    },
    _owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User'}
},
{ timestamps: true, usePushEach: true });

var Bike = mongoose.model('Bike', BikeSchema);