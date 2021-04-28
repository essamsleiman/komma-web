const express = require("express");
const passport = require("passport");
const router = require("express").Router();
const readline = require("readline");
const { google } = require("googleapis");
const { calendar } = require("googleapis/build/src/apis/calendar");
const { OAuth2 } = google.auth;
const fs = require("fs");
const TOKEN_PATH = "../token.json";
const credential_PATH = "../credentials.json";
let googleUser = require("../models/googleuser.model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const jwt = require("jsonwebtoken");
require("dotenv").config();
// let Event = require("../models/event.model");
// let Org = require("../models/org.model");

// we can grab these keys from .env file

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

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
      "https://www.googleapis.com/auth/calendar",
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
    res.redirect("http://localhost:3000/create/");
  }
);

// rerouted here after callback

var userId = "";
var staffOfOrgsArr;
router.get(
  "/success",
  //passport.authenticate("bearer", { session: false }),
  (req, res) => {
    // console.log("IN SUCCESS", req.user);
    if (req.user) {
      // console.log("NOW USER: ", req.user);
      // console.log("PASS in REQ");
      const user = {
        name: req.user.firstName,
        id: req.user._id,
        accessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
        email: req.user.email,
      };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      // console.log("I HAVE ACCESS TOKEN: ", accessToken);
      res.json({ user: user });
    } else {
      console.log("FAIL IN USER REQ");
      res.json("Call didn't go through");
    }
  }
);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // var token = req.headers.authorization.split(" ")[1];
  // console.log("IN AUTH");

  if (token == null) {
    // console.log("IN AUTH1");

    return res.sendStatus(401);
  }
  // console.log("authHeader: ", authHeader);
  // console.log("TOKEN: ", token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Error: ", err);

      res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = router;
