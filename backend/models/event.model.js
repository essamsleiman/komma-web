const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const SingleDay = new Schema({
  // calendarObj: {
    id: { type: Number, required: true},
    date: {type: String, required: true},
    group: {type: Number, required: true},
    first: {type: Boolean, required: true},
    times: { type: [Array], required: true},
  // }
})

const eventSchema = new Schema({
  // uniqueID: {type: _id, required: true },
  hostID: { type: String, required: true },
  hostName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  timePeriod: { type: Number, required: true },
  meetingStartTime: { type: String, required: true },
  meetingEndTime: { type: String, required: true },
  // minTimeRange: { type: Date, required: true },
  maxTimeRange: { type: Number, required: true },

  respondentName: { type: [String] },
  respondentEmail: { type: [String] },

  hostAvailability: { type: [Date, Date] },
  availabilities: { type: [[Date, Date]] },
  finalMeetingTime: { type: Date },
  daysSentAfter: { type: Number },
  respondedSentAfter: { type: Number},
  notifyOnResponse: { type: Boolean, required: true },
  availabilityHidden: { type: Boolean, required: true },
  googleMeetLink: { type: String },
  dateOfEventCreation: { type: Date, required: true },
  
  daysObject: { type: [SingleDay], required: true},

});

const event = mongoose.model("event", eventSchema);

module.exports = event;