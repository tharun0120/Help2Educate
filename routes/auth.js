const router = require("express").Router();
const User = require("../models/users");
const passport = require("passport");
const ensureAuthLocal = require("../middleware/ensureAuth");

const CLIENT_HOME_PAGE_URL = "http://localhost:3001/login/success";

//register
router.post("/register", async (req, res) => {
  //   res.send("register");
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//login
router.post("/login", async (req, res) => {
  //   res.send("login");
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
});

//logout
router.post("/logout", ensureAuthLocal, async (req, res) => {
  //   res.send("logout");
  //   console.log("logout");
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send("Logged out successfully");
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/logoutAll", ensureAuthLocal, async (req, res) => {
  //   res.send("logoutAll");
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logged Out of all the devices");
  } catch (error) {
    res.status(500).send();
  }
});

//google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "https://www.googleapis.com/auth/userinfo.email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "http://localhost:3001/login/failed",
  }),
  (req, res) => {
    const token = req.user.tokens[req.user.tokens.length - 1].token;
    const user = req.user;
    console.log(user, token);
    localStorage.setItem("token", token);
    res.send({ user, token });
  }
);

// twitter
// router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
// router.get(
//   "/twitter/redirect",
//   passport.authenticate("twitter", {
//     successRedirect: CLIENT_HOME_PAGE_URL,
//     failureRedirect: "/auth/login/failed",
//   })
// );

//facebook
// router.get("/facebook", passport.authenticate("facebook"));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

//twitter
// router.get("/twitter", passport.authenticate("twitter"));

// router.get(
//   "/twitter/callback",
//   passport.authenticate("twitter", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

module.exports = router;
