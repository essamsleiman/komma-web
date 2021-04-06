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

    const newEvent = new EVent({
        name,
        hostname,
        link,
    });
    newEvent
        .save()
        .catch((err) => res.status(400).json("Error1: " + err));
});

module.exports = router;