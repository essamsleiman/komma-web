const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  // uniqueID: {type: _id, required: true },
  hostID: { type: String, required: true },
  hostName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  // timePeriod: { type: Number, required: true },
  meetingStartTime: { type: String, required: true },
  meetingEndTime: { type: String, required: true },
  // minTimeRange: { type: Date, required: true },
  maxTimeRange: { type: Number, required: true },
  respondents: { type: [String] },
  hostAvailability: { type: [Date, Date] },
  availabilities: { type: [[Date, Date]] },
  finalMeetingTime: { type: Date },
  daysSentAfter: { type: Number },
  respondedSentAfter: { type: Number },
  notifyOnResponse: { type: Boolean, required: true },
  availabilityHidden: { type: Boolean, requried: true },
  googleMeetLink: { type: String },

  // respondents: [],
  // hostAvailability: [],
  // availabilities: [],
  // _id: 607f3884952771aba91c4383,
  // title: 'd',
  // hostName: 'Komma',
  // hostID: '6069172a2beb8827ec1ff2cf',
  // description: 'd',
  // location: '',
  // meetingStartTime: '9am',
  // meetingEndTime: '5pm',
  // maxTimeRange: 7,
  // notifyOnResponse: true,
  // availabilityHidden: true
});

const event = mongoose.model("event", eventSchema);

module.exports = event;
