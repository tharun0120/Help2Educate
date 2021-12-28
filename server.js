require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const donationsRoutes = require("./routes/donations");
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);

//configure passport
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

if (process.env.NODE_ENV === "Development") app.use(morgan("dev"));

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, mode"
  );

  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    //move on
    next();
  }
});

//session
app.use(
  session({
    secret: "thisisacat",
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/donations", donationsRoutes);

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "Development")
    console.log(`${process.env.NODE_ENV} Server is up on Port ${PORT}`);
});
