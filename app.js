require("./db.js");
require("./auth");

const passport = require("passport");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const routes = require("./routes/index");

const app = express();

const logger = (req, res, next) => {
  console.log(
    "Method: " + req.method,
    "\n",
    "Path: " + req.path,
    "\n",
    req.query
  );
  next();
};

//logger
// app.use(logger);

// view engine setup
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "hbs");

// enable sessions
const session = require("express-session");
const sessionOptions = {
  secret: "cookie_key", //TODO: move elsewhere
  resave: true,
  saveUninitialized: true,
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(express.json());

app.use("/", routes);
// app.use('/???', post);

// app.listen(3000);
//https://www.freecodecamp.org/news/how-to-deploy-an-application-to-heroku/
app.listen(process.env.PORT || 3000);
