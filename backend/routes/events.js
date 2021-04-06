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
    const link = req.body.link;

    const newEvent = new Event({
        // future fields to be added
        // uniqueID: {type: id, required: true },
        // hostID: { type: id, required: true},
        // hostName: { type: String, required: true },
        // title: { type: String, required: true },
        // description: { type: String, required: true },
        // location: { type: String, required: true },
      
        // minTimeRange: { type: Date, required: true},
        // maxTimeRange: { type: Date, required: true},
      
        // respondents: { type: [String], required: true},
        // hostAvailability: { type: [Date, Date], required: true },
        // Availabilities: { type: [[Date, Date]], required: true },
        // finalMeetingTime: { type: Date, requried: true},
        // sendInvite: {
        //   daysSentAfter: { type: Number, required: true},
        //   registeredSentAfter: { type: Number, requried: true},
        // },
        // notifyOnResponse: { type: Boolean, required: true},
        // availabilityHidden: { type: Boolean, requried: true},
        // meetingInviteLink: {type: String, required: true},
        // googleMeetLink: { type: String, required: true},
    });
    newEvent
        .save()
        .catch((err) => res.status(400).json("Error1: " + err));
});

module.exports = router;