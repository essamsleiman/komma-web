const express = require("express");
const passport = require("passport");
const router = require("express").Router();
let googleUser = require("../models/googleuser.model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
// let Event = require("../models/event.model");
// let Org = require("../models/org.model");

const mongoose = require("mongoose");
router.get("/", (req, res) => res.send("hi"));
router.get("/failed", (req, res) => res.send("failure"));

// Calls google auth api

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

//Callback for google auth api

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/auth/success",
    failureRedirect: "http://localhost:3000/signin",
  }),
  function (req, res, next) {
    // res.send(req.user);
    res.redirect("http://localhost:3000/myprofile/");
  }
);

// rerouted here after callback

var userId = "";
var staffOfOrgsArr;
router.get("/success", passport.authenticate('bearer', { session: false }), (req, res) => {
  if (req.user) {
    console.log("REQEssam", req.user);
    return req.user
  } else {
    console.log("FAIL IN REQ");
    return null
  }
});



module.exports = router;
