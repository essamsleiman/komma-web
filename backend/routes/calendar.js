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
const oAuth2Client = new OAuth2(id, secret);

router.route("/getCalendars").get((req, res) => {
  // console.log("intside getcalendars api", req.query);
  oAuth2Client.setCredentials({
    access_token: req.query.access,
    refresh_token: req.query.refresh,
  });

  const calendar = google.calendar({ version: "v3", oAuth2Client });
  calendar.calendarList.list(
    {},
    (err, result) => {
      if (err) {
        console.log("error in calendar list output" + err);
      } else {
        console.log("Output of calendar list" + JSON.stringify(result));
        res.json(result);
      }
    }
  )
})

// get event API
router.route("/get").get((req, res1) => {
  // setup host user for calendar grabbing:
  // console.log("in calendar get request", req.query);

  // console.log("PARAMS ESSAM NEW Query: ", req.query.access, req.query.refresh);
  oAuth2Client.setCredentials({
    access_token: req.query.access,
    refresh_token: req.query.refresh,
  });

  listEvents(oAuth2Client);
  // console.log("EVENTS ESSAM", events);

  //timeMin: new Date().toISOString(),
  function ISODateString(d) {
    function pad(n) {
      return n < 10 ? "0" + n : n;
    }
    return (
      d.getUTCFullYear() +
      "-" +
      pad(d.getUTCMonth() + 1) +
      "-" +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours()) +
      ":" +
      pad(d.getUTCMinutes()) +
      ":" +
      pad(d.getUTCSeconds()) +
      "Z"
    );
  }
  // var timeMin = ISODateString(new Date(req.query.timeMin));
  // var timeMin = new Date().toISOString();
  var timeMin = req.query.timeMin;
  var timeMax = req.query.timeMax;
  // var timeMax = ISODateString(new Date(req.query.timeMax));
  // console.log("date parse test", Date.parse(timeMin));
  // console.log("time min and time max", new Date(timeMin), timeMax, new Date());
  function listEvents(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    calendar.events.list(
      {
        calendarId: "primary",
        // maxResults: 10,
        // timeMin: new Date(timeMin).toISOString(),
        // timeMin: new Date(timeMin).toISOString(),
        timeMin: req.query.timeMin,
        timeMax: req.query.timeMax,
        singleEvents: true,
        // orderBy: "startTime",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error calendar: " + err);
        const events = res.data.items;
        res1.json(res.data);
        if (events.length) {
          // console.log("Upcoming events:");
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            // console.log(`${start} - ${event.summary}`);
          });
        } else {
          // console.log("No upcoming events found.");
        }
      }
    );
  }
});

module.exports = router;
