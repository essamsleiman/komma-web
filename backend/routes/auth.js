const express = require("express");
const passport = require("passport");
const router = require("express").Router();
const readline = require('readline');
const {google} = require('googleapis');
const fs = require('fs');
const TOKEN_PATH = '../token.json';
const credential_PATH = '../credentials.json';
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
    prompt: 'consent',
    approval_prompt: 'force',
    access_type: 'offline',
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar.readonly",
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


async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  var ret;
  await calendar.events.list({
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
      ret = events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
  console.log("after api call");
  return ret;
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  var ret;
  fs.readFile('token.json', (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    ret = callback(oAuth2Client);
    console.log("ret", ret);
  });
  return ret;
}

function getEvents(callback) {
  var ret;
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    ret =  callback(JSON.parse(content), listEvents);
    console.log("ret2", ret)
  })
  return ret
  // return ret;
}

router.get("/events", function(req, res) {
  // let events = getEvents()
  // console.log(events)
  // res.send(events)
  (async() => {
    console.log('before start');
    res.json(getEvents(authorize))

    // if(ret) {
    //   res.json(ret)
    // }
    // await res.json(getEvents());
    
    console.log('after start');
  })();
  // getEvents().then((value) => console.log(value))
  }
);






module.exports = router;
