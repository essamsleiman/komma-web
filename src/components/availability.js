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
    /*
  
      Calendar Events: 
      [
        {
          start: {dateTime: "2021-04-24T18:00:00-07:00"}
          end: {dateTime: "2021-04-24T19:00:00-07:00"}
        },
        {
          start: {dateTime: "2021-04-24T18:00:00-07:00"}
          end: {dateTime: "2021-04-24T19:00:00-07:00"}
        }
      ]

      Calendar List: 
      [
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false]
      ]

      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();
        
      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);



    */

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
    for (let i = 0; i <= eventData.maxTimeRange; i++) {
      var innerList = [];
      for (let j = 0; j < timeRange; j++) {
        innerList.push(false);
      }
      calendarList.push(innerList);
    }
    console.log("calendarList hit: ", calendarList);

    // firstDay: var dateCreated = new Date(eventData.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
    // numofDays: timeRange
    var dateCreated = new Date(eventData.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
    var ddCreated = String(dateCreated.getDate()).padStart(2, "0");
    // var hrCreated = String(dateCreated.getHours()).padStart(2, "0");
    var hrStartRange = parseInt(eventData.meetingStartTime.substring(0, 2)); // this is the hour star
    // var minCreated = String(dateCreated.getMinutes()).padStart(2, "0");
    var minStartRange = eventData.meetingStartTime.substring(3);
    var mmCreated = String(dateCreated.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyyCreated = dateCreated.getFullYear();

    for (let i = 0; i < calendarEvents.items.length; i++) {
      var startDateOfEvent = new Date(calendarEvents.items[i].start.dateTime);
      // console.log("startDateOfEvent", startDateOfEvent);
      var endDateOfEvent = new Date(calendarEvents.items[i].end.dateTime);
      var dd = String(startDateOfEvent.getDate()).padStart(2, "0");
      var mm = String(startDateOfEvent.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = startDateOfEvent.getFullYear();

      // To calculate the time difference of two dates
      var calendarDay = new Date(yyyy, mm, dd);
      var createdDay = new Date(yyyyCreated, mmCreated, ddCreated);
      var Difference_In_Time = Math.abs(
        calendarDay.getTime() - createdDay.getTime()
      );

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      // console.log("Difference_In_Days", Difference_In_Days);

      var hr = String(startDateOfEvent.getHours()).padStart(2, "0");
      var hrend = parseInt(String(endDateOfEvent.getHours()).padStart(2, "0"));
      var min = String(startDateOfEvent.getMinutes()).padStart(2, "0");
      // var hrDistance = hrStartRange -
      console.log("HOUR: ", hr, "hrStartRange: ", hrStartRange);
      var timeRange = (parseInt(hr) - parseInt(hrStartRange)) * 2;
      if (min == "30") {
        timeRange++;
      }
      if (minStartRange == "30") {
        timeRange--;
      }

      // var latestTime = eventData.meetingEndTime; // 12:00
      // var earliestTime = eventData.meetingStartTime; // 09:00
      // if (hrStartRange > hrend) {
      //   continue;
      // }
      // if (latestTime <= current_event_time(start)) {
      //   continue;
      // }
      console.log("ESSAM CALENDAR LIST: ", calendarList);
      if (timeRange < 0 || timeRange >= calendarList[i].length) {
        console.log(
          "hit in timerange if statement - timerange:",
          timeRange,
          "calendar list length",
          calendarList[i].length
        );
        continue;
      }

      calendarList[Difference_In_Days][timeRange] = true;
    }

    for (let i = 0; i < calendarList.length; i++) {
      for (let j = 0; j < calendarList[i].length; ++j) {
        let temp = calendarList[i][j];
        calendarList[i][j] = ["", temp];
      }
    }

    console.log("hit calednarlist after for loop", calendarList);

    /*
      calendarList[
        [["", false], false, false, false, false, false]
        [false, false, false, false, true, false]
        [false, false, false, false, false, false]
        [false, false, false, false, false, false]
      ]
      [
        [
          ["9am", false],
          ["930am", false],
          ["10am", true],
          ["1030am", false],
          ["11am", false],
          ["1130m", false],
          ["12pm", false],
          ["1230pm", false],
          ["1230pm", false],
        ],
      ]
    */

    setCalendarListState(calendarList);
    console.log("calendarList: ", calendarList);
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

            // createCalendarList();
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

  const [daysState, setDaysState] = useState([]);
  function format(date) {
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  }

  function setupDates() {
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
      // times: calendar1_intervals,
      times: calendarListState,
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
          <button type="button" onClick={createCalendarList}>
            Essam's button
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
