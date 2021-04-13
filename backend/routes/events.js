const express = require("express");
const passport = require("passport");
const router = require("express").Router();

let Event = require("../models/event.model");

// get request template
router.route("/").get((req, res) => {
  Event.find()
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("Error 1: " + err));
  console.log("hit res events.js ", res);
});

// post request tempalte
router.route("/add").post((req, res) => {
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
router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("error: " + err));
});

module.exports = router;
