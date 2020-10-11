const passport = require("passport");
const Authentication = require("./controllers/auth");
require("./services/passport");

const requireAuth = passport.authenticate("jwt", {
  session: false,
  // successRedirect: "/",
  // failureRedirect: "/signup",
});
const requireSignin = passport.authenticate("local", {
  session: false,
  // successRedirect: "/",
  // failureRedirect: "/signin",
});

module.exports = (app) => {
  app.get("/", requireAuth, (req, res) => {
    res.send({ test: "hi there" });
  });
  app.post("/signup", Authentication.signup);
  app.post("/signin", requireSignin, Authentication.signin);
};
