const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  hostName: { type: String, required: true },
  link: { type: String, required: true},
  // createdAt: { type: Date, required: Date.now },
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
