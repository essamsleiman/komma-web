const express = require("express");
const passport = require("passport");
const { google } = require("googleapis");
const router = require("express").Router();
require("dotenv").config();
let Event = require("../models/event.model");

const { OAuth2 } = google.auth;
const id = process.env.GOOGLE_CLIENT_ID;
const secret = process.env.GOOGLE_CLIENT_SECRET;

const oAuth2Client = new OAuth2(id, secret);

// get request template
router.route("/").get((req, res) => {
  // object that control's current logged in user's calendar.
  const calendar = google.calendar({ version: "v3", auth });

  Event.find()
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("Error 1: " + err));
  console.log("hit res events.js ", res);
});

// post request tempalte
router.route("/add").post((req, res) => {
  var dateOfEventCreation = new Date();
  console.log("hit in route for add"); 
  const title = req.body.title;
  const hostName = req.body.hostName;
  const hostID = req.body.hostID;
  const description = req.body.description;
  const location = req.body.location;
  const meetingStartTime = req.body.meetingStartTime;
  const meetingEndTime = req.body.meetingEndTime;
  const maxTimeRange = req.body.maxTimeRange;
  const respondents = req.body.respondents;
  const daysSentAfter = req.body.daysSentAfter;
  const notifyOnResponse = req.body.notifyOnResponse;
  const availabilityHidden = req.body.availabilityHidden;
  const timePeriod = req.body.timePeriod;

  [
    ["9am", false],
    ["930am", false],
    ["10am", true],
    ["1030am", false],
    ["11am", false],
    ["1130am", false],
    ["12pm", false],
    ["1230pm", false],
    ["1230pm", false],
  ];
  var timeSlots = [];

  var newEvent;
  if (req.body.sendInDaysBool) {
    newEvent = new Event({
      daysSentAfter: req.body.daysSentAfter,
      title,
      hostName,
      hostID,
      description,
      location,
      meetingStartTime,
      meetingEndTime,
      maxTimeRange,
      respondents,
      timePeriod,
      // daysSentAfter,
      notifyOnResponse,
      availabilityHidden,
      dateOfEventCreation,
    });
  } else {
    newEvent = new Event({
      respondedSentAfter: req.body.respondedSentAfter,
      title,
      hostName,
      hostID,
      description,
      location,
      meetingStartTime,
      meetingEndTime,
      maxTimeRange,
      respondents,
      timePeriod,
      // daysSentAfter,
      notifyOnResponse,
      availabilityHidden,
      dateOfEventCreation,
    });
  }
  console.log("AT THIS POINT", newEvent);
  newEvent
    .save()
    .then(() => res.json(newEvent))
    .catch((err) => {
      res.status(400).json("Error1: " + err);
      console.log("hit error", err);
    });
});

// TODO - Check if the actual event is even a hangouts event and fix the field accordingly.
router.route("/create/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      // setup host user for calendar insertion:
      oAuth2Client.setCredentials({
        access_token: event.hostAccessToken,
        refresh_token: event.hostRefreshToken,
      });

      // find availability algorithm?

      var start;
      var end;
      // setup event template:
      var newevent = {
        // summary is the name of the event
        summary: "event.title",
        description: "event.description",
        // sends a calendar update to everyone
        sendUpdates: "all",
        start: {
          dateTime: start,
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: end,
          timeZone: "America/Los_Angeles",
        },
        // you can pass in attendee emails here, or with other parameters as well outlined in the google API documenation
        attendees: [respondents],
        // this field is to create the google meet things (don't edit this its really senitive for some)
        conferenceData: {
          createRequest: {
            // request ID is just a randomly generated string
            requestId: "sample123",
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      };

      // insert event into calendar
      calendar.events.insert(
        {
          // auth is auth details
          auth: auth,
          // we want the primary calendar
          calendarId: "primary",
          // resource field is the template up above
          resource: newevent,
          // this should be set to 1 to allow for meet creation
          conferenceDataVersion: 1,
        },
        function (err, event) {
          if (err) {
            console.log("there was an error with inserting an event: ", +err);
            return;
          }
          console.log("Event created!");
        }
      );
    })
    .catch((err) => res.status(400).json("Error in meeting creation" + err));
});

router.route("/update/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (event.availabilities) {
        event.availabilities = event.availabilities.append(
          req.body.newAvailability
        );
      } else {
        var newAvailability = [];
        event.availabilities = newAvailability.append(req.body.newAvailability);
      }

      event
        .save()
        .then(() => res.json("Event updated!"))
        .catch((err) => res.status(400).json("Error1: " + err));
    })
    .catch((err) => res.status(400).json("Error1: " + err));

  const name = req.body.name;
  const hostname = req.body.hostname;
  const meetingInviteLink = req.body.meetingInviteLink;
  const googleMeetLink = req.body.googleMeetLink;

  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const minTimeRange = Date.parse(req.body.minTimeRange);
  const maxTimeRange = Date.parse(req.body.minTimeRange);

  const newEvent = new Event({
    name,
    hostname,
    meetingInviteLink,
    googleMeetLink,
    title,
    description,
    location,
    minTimeRange,
    maxTimeRange,
  });
  newEvent.save().catch((err) => res.status(400).json("Error1: " + err));
});

// route to find the event by ID
router.route("/get/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      console.log("SUCCESS ESSAM GET", event);
      res.json(event);
    })
    .catch((err) => res.status(400).json("error: " + err));
  // console.log("hit res specific event", res);
});

module.exports = router;
