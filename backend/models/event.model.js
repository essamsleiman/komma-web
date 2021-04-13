const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  // uniqueID: {type: _id, required: true },
  hostID: { type: String, required: true },
  hostName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },

  minTimeRange: { type: Date, required: true },
  maxTimeRange: { type: Date, required: true },

  respondents: { type: [String], required: true },
  hostAvailability: { type: [Date, Date], required: true },
  availabilities: { type: [[Date, Date]], required: true },
  finalMeetingTime: { type: Date, requried: true },
  sendInvite: {
    daysSentAfter: { type: Number, required: true },
    registeredSentAfter: { type: Number, requried: true },
  },
  notifyOnResponse: { type: Boolean, required: true },
  availabilityHidden: { type: Boolean, requried: true },
  meetingInviteLink: { type: String, required: true },
  googleMeetLink: { type: String, required: true },
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
