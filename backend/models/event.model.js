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
  respondents: { type: [String] },
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

// this is what we are trying to save
  // const [days, setDays] = useState([
  //   {id: 0, date: '4/12/2021', group: 0, first: true, times: JSON.parse(JSON.stringify(intervals))},
  //   {id: 1, date: '4/13/2021', group: 0, first: false, times: JSON.parse(JSON.stringify(intervals))},
  //   {id: 2, date: '4/22/2021', group: 1, first: true, times: JSON.parse(JSON.stringify(intervals))},
  //   {id: 3, date: '4/23/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))},
  //   {id: 4, date: '4/24/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))},
  //   {id: 5, date: '4/25/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))},
  //   {id: 6, date: '4/26/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))},
  //   {id: 7, date: '4/27/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))},
  // ])

  
// var intervals = new Schema[{
//   date: String,
//   going: Number,
//   total: Number,
//   available: Boolean,
//   goingArr: [String],
//   notGoingArr: [String],
// }];



// intervals = [String, Number, Number, Boolean, [], []]

  /*
  [
      "09:00",
      0,
      5,
      false,
      [],
      [
        "James Junaidi",
        "Omid Mogasemi",
        "Essam Sleiman",
        "John Doe",
        "Sally Brown",
      ],
    ],
    [
      "09:30",
      2,
      5,
      false,
      ["James Junaidi", "Omid Mogasemi"],
      ["Essam Sleiman", "John Doe", "Sally Brown"],
    ],
    */