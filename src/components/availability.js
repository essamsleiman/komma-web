import react, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftBar from "./availability/left_bar";
import TopBar from "./availability/top_bar";
import "./css/availability.css";
import InputCalendar from "./availability/input_calendar";
import GroupCalendar from "./availability/group_calendar";
import axios from "axios";
import { updateEvent } from "../Redux/actions/eventActions";
import { fetchUser } from "../Redux/actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import testing data
import {
  intervals,
  calendar1_intervals,
  calendar2_intervals,
  calendar3_intervals,
} from "./test_data";
// import { NULL } from "node-sass";

function Availability(props) {
  // variables to hold event data
  const eventID = props.match.params.eventId;
  const [eventData, setEventData] = useState({});
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarListState, setCalendarListState] = useState([]);

  // var isHost = props.user.user.id === ;
  const [viewingGroup, setViewingGroup] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  var user = {};
  var access;
  var refresh;

  // initialize an array of interval.length booleans all set to false
  // loop through all start times, checking their corresponding end time
  // if part of their time falls in the times listed in interval[i][j][0], where i represents the day and j represents the position of the interval
  // then mark those specific entries as true

  /* 


  7 days
  09:00 - 17:00
  11:00 
  [
      [ ...intervals, ex: 0900 -> 1800 ]
      [ ...intervals ]
  ]
  
  
  */



  function createCalendarList() {
    for (let i = 0; i < eventData.maxTimeRange; i++) {
      var timeRange =
        (parseInt(eventData.meetingEndTime.substring(0, 2)) -
          parseInt(eventData.meetingStartTime.substring(0, 2))) *
        2;
      if (eventData.meetingEndTime.substring(3) == "30") {
        timeRange++;
      }
      if (eventData.meetingStartTime.substring(3) == "30") {
        timeRange--;
      }
    }

    let calendarList = [];
    for (let i = 0; i < eventData.maxTimeRange; i++) {
      var innerList = [];
      for (let j = 0; j < timeRange; j++) {
        innerList.push(false);
      }
      calendarList.push(innerList);
    }

    /*
      [
        
      ]
     */

    // initializes intervals in the db
    let intervals = [];
    for (let i = 0; i < eventData.maxTimeRange; i++) {
      let curDaysIntervals = [];
      let meetingTime = eventData.meetingStartTime;
      for (let j = 0; j < timeRange; j++) {
        let curInterval = [];
        if (meetingTime.substring(3) == "30") {
          meetingTime = meetingTime.replace(
            meetingTime.substring(0, 2),
            String(parseInt(meetingTime.substring(0, 2)) + 1)
          );
          meetingTime = meetingTime.replace(meetingTime.substring(3), "00");
        } else {
          meetingTime = meetingTime.replace(meetingTime.substring(3), "30");
        }
        curInterval.push(meetingTime);
        curInterval.push(0);
        curInterval.push(0);
        curInterval.push([]);
        curInterval.push([]);
        curDaysIntervals.push(curInterval);
      }
      intervals.push(curDaysIntervals);
    }

    console.log(calendarList);
    console.log(intervals);
    setCalendarListState(calendarList);
  }

  useEffect(() => {
    user = props.user;

    // grab the date of event creation and generate start and end dates
    var dateCreated = new Date(eventData.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
    var first = new Date(dateCreated);
    var end = new Date(dateCreated);
    end.setDate(end.getDate() + eventData.maxTimeRange);
    if (props.user.user) {
      axios
        .get(`http://localhost:5000/calendar/get`, {
          params: {
            // access and refresh tokens being passed in
            access: props.user.user.accessToken,
            refresh: props.user.user.refreshToken,
            // time min and max parameters being passed in
            timeMin: first,
            timeMax: end,
          },
        })
        .then((response) => {
          if (response) {
            console.log("hit CALENDAR EVENTS: ", response.data);

            setCalendarEvents(response.data);

            createCalendarList();
          } else {
            console.log("hit error in calendar get axios call");
          }
        });
    }
  }, [props.user]);

  useEffect(() => {
    user = props.user;
    console.log("USER ESSAM :", user);
    if (user.user) {
      access = user.user.accessToken;
      refresh = user.user.refreshToken;
    }
  }, []);

  useEffect(() => {
    props.fetchUser();
    // axios call to get the data:
    axios
      .get(`http://localhost:5000/events/get/${eventID}`)
      .then((response) => {
        if (response) {
          console.log("hit response in eventPage", response);
          // eventInfo = response.data;
          // if (props.user.user) {
          //   console.log("CHECK: ", props.user.user.id, response.data.hostID);
          //   isHost = props.user.user.id === response.data.hostID;
          //   setInputDisabled(false);
          // }
          setEventData(response.data);
        } else {
          console.log("hit error in eventPage axios call");
        }
      });
    // alert("axios call finished");
  }, []);

  useEffect(() => {
    if (props.user.user) {
      if (props.user.user.id === eventData.hostID) setInputDisabled(false);
    }
  }, []);

  const [userInfo, setUserInfo] = useState({
    signedIn: false,
    name: "",
    email: "",
    googleName: "Edward Chew",
    googleEmail: "edward@email.com",
  });

  /* 

    These variables exist to server input_calendar.js. 
    intervals: [the time range's start point, num marked attending/num responded so far, 
                current user can attend] 
    days: [{id, date, a copy of intervals showing availability for that specific day}]
    
  */
  // must use JSON.parse(JSON.stringify(intervals)) to create unique multi-dimensional array copies

  // EXAMPLE CODE OF INCREMENTING A DATE: https://stackoverflow.com/questions/24312296/add-one-day-to-date-in-javascript#:~:text=getDate%20only%20returns%20the%20day,setDate%20and%20appending%201.&text=JavaScript%20will%20automatically%20update%20the%20month%20and%20year%20for%20you.
  // Create new Date instance
  var date = new Date();

  // Add a day
  date.setDate(date.getDate() + 1);

  // var dateCreated = eventData.dateOfEventCreation; // "2021-04-21T17:45:35.198Z"
  // console.log("date created", dateCreated);
  // if (eventData.dateOfEventCreation) {
  //   var dd = String(eventData.dateOfEventCreation.getDate()).padStart(2, "0");
  //   var mm = String(eventData.dateOfEventCreation.getMonth() + 1).padStart(
  //     2,
  //     "0"
  //   ); //January is 0!
  //   var yyyy = eventData.dateOfEventCreation.getFullYear();
  //   console.log("DD MM YY", dd, mm, yyyy);
  // }

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
  const [daysState, setDaysState] = useState([]);
  function format(date) {
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  }

  function setupDates() {
    // var dateCreated = new Date(eventData.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
    // var dd = String(dateCreated.getDate()).padStart(2, "0");
    // var mm = String(dateCreated.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var yyyy = dateCreated.getFullYear();

    // var daysInitial = []; // the days initial object
    // // get number of days after:
    // var days = eventData.maxTimeRange;

    // var loop = new Date(dateCreated);
    // var end = new Date(dateCreated);
    // end.setDate(end.getDate() + days);
    // var counter = 0;
    // var curArr;
    // while (loop <= end) {
    //   var obj = {
    //     id: counter,
    //     date: format(loop), // method to format datetime in "MM/DD/YYYY"
    //     group: 0, // all objects in group 0 for now
    //     times: JSON.parse(JSON.stringify(calendarListState[counter])),
    //   };
    //   if (counter == 0) {
    //     curArr = [obj];
    //   } else {
    //     curArr.push(obj);
    //   }

    //   ++counter;
    //   var newDate = loop.setDate(loop.getDate() + 1);
    //   loop = new Date(newDate);
    // }

    setDaysState(eventData.daysObject);
  }

  var calendar1_intervalsTest = [
    // NOTE: The 3 different calendar's intervals are identical right now. Haven't had time to randomize them yet
    [
      ["09", false],
      ["09t", false],
      ["10", true],
      ["10t", true],
      ["11", false],
      ["11t", false],
      ["12", false],
      ["12t", false],
    ],
    [
      ["09", false],
      ["09t", false],
      ["10", true],
      ["10t", true],
      ["11", false],
      ["11t", false],
      ["12", false],
      ["12t", false],
    ],
    [
      ["09", false],
      ["09t", false],
      ["10", true],
      ["10t", true],
      ["11", false],
      ["11t", false],
      ["12", false],
      ["12t", false],
    ],
  ];
  console.log("hit calendar 1 intervals test", calendar1_intervalsTest);

  // events data is stored in the state: calendarEvents

  // algorithm outline for generating a calendar interval:
  function generateInterval() {
    // get number of days => (0-7).
    // get time range: i.e. 9am - 5pm
    // map days to dates: i.e. 0->4/21, 1->4/22, 2->4/23, .... etc
    // generates a template using dates and time ranges: (NOTE: All fields will be true)

    // var template = [];

    // iterate through calendarEvents state, and check for time ranges for events.
    // algorithm to update the template when an event is found, and update those availabilities to false.
    // return template
    console.log("hit calendarevent inside generate Interval", calendarEvents);
  }

  const calendars = [
    {
      id: 0,
      calendarLabel: calendarEvents.summary,
      times: calendar1_intervals,
    },
  ];
  // const calendars = [
  //   { id: 0, calendarLabel: "Personal Calendar", times: calendar1_intervals },
  //   { id: 1, calendarLabel: "UCD Calendar", times: calendar2_intervals },
  //   { id: 2, calendarLabel: "Komma Calendar", times: calendar3_intervals },
  // ];
  const numResponses = 5;
  console.log("props.user.user", props.user.user);

  const isHost =
    props.user.user && props.user.user !== {}
      ? props.user.user.id === eventData.hostID
      : false;

  if (props.user.user === {}) {
    return <div>Loading...</div>;
  } else {
    console.log("EVENTDATA", eventData);
    return (
      <div>
        <div className="row no-gutters justify-content-center shadow-card top-margin">
          <div className="col-3">
            <LeftBar
              viewingGroup={(viewingGroup, eventData)}
              setViewingGroup={setViewingGroup}
              respondents={eventData.respondents}
              title={eventData.title}
              meetingDuration={eventData.timePeriod}
              isHost={isHost}
              urlId={window.location.pathname}
            />
          </div>
          <div className="col-9">
            <div className="vertical-bar"></div>
            {props.user.user && props.user.user.id !== eventData.hostID ? (
              <TopBar
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setInputDisabled={setInputDisabled}
                meetingHostName={eventData.hostName}
              />
            ) : (
              <div> Is Host </div>
            )}
            {!viewingGroup ? (
              <InputCalendar
                viewingGroup={viewingGroup}
                intervals={intervals}
                days={daysState}
                setDays={setDaysState}
                inputDisabled={inputDisabled}
                numResponses={numResponses}
                calendars={calendars}
              />
            ) : (
              <GroupCalendar
                viewingGroup={viewingGroup}
                intervals={intervals}
                days={daysState}
                setDays={setDaysState}
                inputDisabled={inputDisabled}
                numResponses={numResponses}
              />
            )}
          </div>
          <button type="button" onClick={setupDates}>
            hi guys
          </button>
          <button type="button" onClick={generateInterval}>
            james' button
          </button>
        </div>
      </div>
    );
  }
}

Availability.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  event: PropTypes.array.isRequired,
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event.newEvent,
  user: state.user.user,
});

export default connect(mapStateToProps, { updateEvent, fetchUser })(
  Availability
);
