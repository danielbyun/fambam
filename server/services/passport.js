const passport = require("passport");
const User = require("../models/User");
const config = require("../config/config");

// passport strategies
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// create local strategy
// const localOptions = { usernameField: "username" };
// const localLogin = new LocalStrategy(localOptions, function (
//   username,
//   password,
//   done
// ) {
//   // verify this username and password, call done with the user
//   // if it is the correct username and password
//   // otherwise, call done with false
//   User.findOne({ username }, function (err, user) {
//     if (err) return done(err);
//     if (!user) return done(null, false); // no error, but user was not found

//     // compare password - is 'password' equal to user.password?
//     user.comparePassword(password, function (err, isMatch) {
//       if (err) return done(err);
//       if (!isMatch) return done(null, false);

//       return done(null, user);
//     });
//   });
// });

const localLogin = new LocalStrategy(function (username, password, done) {
  console.log("creds:", username, password);
  // verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({ username }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Incorrect username" }); // no error, but user was not found

    // compare password - is 'password' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (!isMatch)
        return done(null, false, { message: "Incorrect password." });

      console.log(user);
      return done(null, user);
    });
  });
});

// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // see if the user ID in the payload exists in our database
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);

    // if it does, call 'done' with that user
    if (user) {
      return done(null, user); // no error, found user
    } else {
      // otherwise, call done without a user object
      return done(null, false); // no error but also no user
    }
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
