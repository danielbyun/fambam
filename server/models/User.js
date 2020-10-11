const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// on save hook, encrypt password
User.pre("save", function (next) {
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      next(err);
      return err;
    }

    // hash (encrypt) the password using the salt
    console.log(user.password);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", User);
