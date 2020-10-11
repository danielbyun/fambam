const jwt = require("jwt-simple");
const User = require("../models/User");
const config = require("../config/config");

const generateTokenForUser = (user) => {
  return jwt.encode({ sub: user.id, iat: user.date }, config.secret);
};

exports.signup = (req, res, next) => {
  const {
    body: { email, username, password },
  } = req;

  if (!email || !password || !username)
    return res
      .status(422)
      .send({ error: "You must provide email, username, and password" });

  // see if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      res.status(500).send({ error: err });
      return next(err);
    }

    // if a user with email does exist, return an error
    if (existingUser) res.status(422).send({ error: "Email is in use." });

    // if a user with email does not exist, create and save new user
    const user = new User({
      email,
      username,
      password,
    });

    user.save((err) => {
      if (err) return next(err);

      // Respond to request indicating the user was created
      res.json({ token: generateTokenForUser(user) });
    });
  });
};

exports.signin = (req, res, next) => {
  console.log("signin: auth.js", req.user);
  // User has already had their username and password auth'd
  // we just need to give them a token
  res.send({ token: generateTokenForUser(req.user) });
};
