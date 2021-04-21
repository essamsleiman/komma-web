const express = require("express");
const passport = require("passport");
const { google } = require("googleapis");
const { calendar } = require("googleapis/build/src/apis/calendar");
const router = require("express").Router();
require("dotenv").config();

const { OAuth2 } = google.auth;
const id = process.env.GOOGLE_CLIENT_ID;
const secret = process.env.GOOGLE_CLIENT_SECRET;

// const oAuth2Client = new OAuth2(id, secret);
const oAuth2Client = new OAuth2(
  "619278648051-qiilealfrh111ajs6ujvn2kam92qevtq.apps.googleusercontent.com",
  "dhdDPzuhWGs1vz5q1xzts6AM"
);

// get event API
router.route("/get").get((req, res1) => {
  // setup host user for calendar grabbing:
  //   res.send("hello there");

  console.log("PARAMS ESSAM NEW Query: ", req.query.access, req.query.refresh);
  oAuth2Client.setCredentials({
    access_token: req.query.access,
    refresh_token: req.query.refresh,
  });
  listEvents(oAuth2Client);
  // console.log("EVENTS ESSAM", events);

  function listEvents(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    calendar.events.list(
      {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const events = res.data.items;
        res1.json(res.data.items);
        if (events.length) {
          console.log("Upcoming 10 events:");
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log("No upcoming events found.");
        }
      }
    );
  }
});

module.exports = router;
