var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {
    first: {
          type: String,
          required: [true, "Missing first name"],
          trim: true,
    },
    last: {
      type: String,
      required: [true, "Missing last name"],
      trim: true
    }
  },
  email: {
    type: String,
    required: [true,"Missing email"],
    minlength: 8,
    maxlength: 30,
    trim: true,
    validate: {
      validator: function(value) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
      },
      message: "Email failed validation"
    }
  },
  password: {
      type: String,
      required: [true, "Missing password"],
      minlength: 8,
      maxlength: 32,
      trim: true,
      validate: {
        validator: function(value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
        },
        message: "Password failed validation, you must have at least 1 number, uppercase and special character"
      }
  },
  _listings: [
      {type: Schema.Types.Object, 'default': [], ref: 'Bike'}
  ]
  },
  { timestamps: true, usePushEach: true });

var User = mongoose.model('User', UserSchema);
