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
    // prompt: "consent",
    // approval_prompt: "force",
    // access_type: "offline",
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
    console.log("IN SUCCESS", req.user);
    if (req.user) {
      console.log("NOW USER: ", req.user);
      const user = {
        name: req.user.firstName,
        accessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
      };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      console.log("I HAVE ACCESS TOKEN: ", accessToken);
      res.json({ accessToken: accessToken });
    } else {
      console.log("FAIL IN REQ");
      res.json("Call didn't go through");
    }
  }
);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // var token = req.headers.authorization.split(" ")[1];
  console.log("IN AUTH");

  if (token == null) {
    console.log("IN AUTH1");

    return res.sendStatus(401);
  }
  // console.log("authHeader: ", authHeader);
  console.log("TOKEN: ", token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Error: ", err);

      res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

router.get("/events", authenticateToken, function (req, res) {
  console.log("REQ USER ESSAM: ", req.user);
  // 1. We need to get access_token and refresh_token from mongodb
  console.log("SUCCESS STEP 2");

  // 2. Setup Oauth
  oAuth2Client.setCredentials({
    access_token: req.user.accessToken,
    refresh_token: req.user.refreshToken,
  });

  console.log("SUCCESS STEP 3");
  // 3. Call Calendar API
  // const calendar = google.calendar({ version: "v3", oAuth2Client });
  console.log("SUCCESS STEP 3");
  var eventsCalendar;
  listEvents(oAuth2Client);
  var calendar;
  function listEvents(auth) {
    calendar = google.calendar({ version: "v3", auth });
  }
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, r) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = r.data.items;
      if (events.length) {
        eventsCalendar = events;

        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
        res.json({ events: events });
        console.log("EVENTS in: ", events);
      } else {
        console.log("No upcoming events found.");
      }

      eventsCalendar = events;
      // res.json({ events: events });
      // return events;
    }
  );

  // // this is the event generation template:
  // var newevent = {
  //   // summary is the name of the event
  //   summary: "Google I/O 2015",
  //   description: "A chance to hear more about Google's developer products.",
  //   start: {
  //     dateTime: "2021-04-01T09:00:00-07:00",
  //     timeZone: "America/Los_Angeles",
  //   },
  //   end: {
  //     dateTime: "2021-04-01T09:00:00-09:00",
  //     timeZone: "America/Los_Angeles",
  //   },
  //   // you can pass in attendee emails here, or with other parameters as well outlined in the google API documenation
  //   attendees: [{ email: "komma.app@gmail.com" }],
  //   // this field is to create the google meet things (don't edit this its really senitive for some)
  //   conferenceData: {
  //     createRequest: {
  //       // request ID is just a randomly generated string
  //       requestId: "sample123",
  //       conferenceSolutionKey: { type: "hangoutsMeet" },
  //     },
  //   },
  // };

  // // this line inserts the event into the calendar
  // calendar.events.insert(
  //   {
  //     // auth is auth details
  //     auth: auth,
  //     // we want the primary calendar
  //     calendarId: "primary",
  //     // resource field is the template up above
  //     resource: newevent,
  //     // this should be set to 1 to allow for meet creation
  //     conferenceDataVersion: 1,
  //   },
  //   function (err, event) {
  //     if (err) {
  //       console.log("there was an error with inserting an event: ", +err);
  //       return;
  //     }
  //     console.log("Event created!");
  //   }
  // );
  // }

  // displays upcoming 10 events
  // calendar.events.list(
  //   {
  //     calendarId: "primary",
  //     timeMin: new Date().toISOString(),
  //     maxResults: 10,
  //     singleEvents: true,
  //     orderBy: "startTime",
  //   },
  //   (err, res) => {
  //     if (err) return console.log("The API returned an error: " + err);
  //     const events = res.data.items;
  //     if (events.length) {
  //       console.log("Upcoming 10 events:");
  //       events.map((event, i) => {
  //         const start = event.start.dateTime || event.start.date;
  //         console.log(`${start} - ${event.summary}`);
  //       });
  //     } else {
  //       console.log("No upcoming events found.");
  //     }
  //   }
  // );
});

module.exports = router;
