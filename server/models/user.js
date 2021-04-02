const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, (error, match) => {
    if (error) return cb(error);
    cb(null, match);
  });
};
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).exec();
};

const User = mongoose.model("user", userSchema);

module.exports = User;
