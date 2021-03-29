const express = require("express");
const passport = require("passport");
const router = require("express").Router();
const readline = require('readline');
const {google} = require('googleapis');
const { OAuth2 } = google.auth
const fs = require('fs');
const TOKEN_PATH = '../token.json';
const credential_PATH = '../credentials.json';
let googleUser = require("../models/googleuser.model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
// let Event = require("../models/event.model");
// let Org = require("../models/org.model");

// we can grab these keys from .env file
// const oAuth2Client = new OAuth2(
//   '619278648051-qiilealfrh111ajs6ujvn2kam92qevtq.apps.googleusercontent.com',
//   'dhdDPzuhWGs1vz5q1xzts6AM'
// )


const mongoose = require("mongoose");
router.get("/", (req, res) => res.send("hi"));
router.get("/failed", (req, res) => res.send("failure"));

// Calls google auth api

router.get(
  "/google",
  passport.authenticate("google", {
    prompt: 'consent',
    approval_prompt: 'force',
    access_type: 'offline',
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
router.get("/success", passport.authenticate('bearer', { session: false }), (req, res) => {

  if (req.user) {
    console.log("REQEssam", req.user);
    return req.user
  } else {
    console.log("FAIL IN REQ");
    return null
  }
});


router.get("/events", function(req, res) {

  // 1. We need to get access_token and refresh_token from mongodb

  // 2. Setup Oauth
  oAuth2Client.setCredentials({
    access_token: "buffer",
    refresh_token: "buffer"
  })  

  // 3. Call Calendar API
  const calendar = google.calendar({version: 'v3', auth});
  // displays upcoming 10 events
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });

  }
);






module.exports = router;
