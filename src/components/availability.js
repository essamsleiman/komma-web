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

  var isHost = false;

  // var isHost = props.user.user.id === ;
  const [viewingGroup, setViewingGroup] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  var user = {};
  var access;
  var refresh;

  useEffect(() => {
    user = props.user;

    if (user.user) {
      axios
        .get(`http://localhost:5000/calendar/get`, {
          params: {
            access: props.user.user.accessToken,
            refresh: props.user.user.refreshToken,
            timeMin: "2021-04-21T17:45:35.198Z",
            // timeMin: new Date(),
            timeMax: "2021-04-28T17:45:35.198Z",
          },
        })
        .then((response) => {
          if (response) {
            console.log("CALENDAR EVENTS: ", response.data);

            setCalendarEvents(response.data);
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
    var dateCreated = new Date(eventData.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
    var dd = String(dateCreated.getDate()).padStart(2, "0");
    var mm = String(dateCreated.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = dateCreated.getFullYear();

    var daysInitial = []; // the days initial object
    // get number of days after:
    var days = eventData.maxTimeRange;

    var loop = new Date(dateCreated);
    var end = new Date(dateCreated);
    end.setDate(end.getDate() + days);
    // var end = new Date(dateCreated.getDate() + days); // this line should work, but need to check

    var counter = 0;
    var curArr;
    while (loop <= end) {
      var obj = {
        id: counter,
        date: format(loop), // method to format datetime in "MM/DD/YYYY"
        group: 0, // all objects in group 0 for now
        times: JSON.parse(JSON.stringify(intervals)),
      };
      if (counter == 0) {
        curArr = [obj];
        // var curArr = [obj];
        // setDaysState(curArr);
      } else {
        // var curDaysState = daysState;
        // setDaysState(curDaysState.push(obj));
        curArr.push(obj);
      }

      // daysInitial.append(obj);

      ++counter;
      var newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    setDaysState(curArr);
    // return daysInitial
  }
  // const calendar1_intervals = calendarEvents.items.map((event) => [event.])

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

  if (props.user.user) {
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
            />
          </div>
          <div className="col-9">
            <div className="vertical-bar"></div>
            {!(props.user.user.id === eventData.hostID) ? (
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
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
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
