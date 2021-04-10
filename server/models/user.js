const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    maxlength: 40,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) return next(error);

      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) return next(error);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, (error, match) => {
    if (error) return cb(error);
    cb(null, match);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), process.env.TOKEN_KEY);
  let oneHour = moment().add(1, "hour").valueOf();
  console.log(moment().add(1, "hour").toDate());
  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (error, user) {
    if (error) return cb(error);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, process.env.TOKEN_KEY, function (error, decode) {
    user.findOne({ _id: decode, token: token }, function (error, user) {
      if (error) return cb(error);
      cb(null, user);
    });
  });
};

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).exec();
};

const User = mongoose.model("user", userSchema);

module.exports = User;
