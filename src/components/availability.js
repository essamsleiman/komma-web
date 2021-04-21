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

  var isHost = false;

  // var isHost = props.user.user.id === ;
  const [viewingGroup, setViewingGroup] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  var user = {};
  var access;
  var refresh;
  useEffect(() => {
    user = props.user;
  }, []);

  useEffect(() => {
    console.log("hit fetchuser", props.user);
    user = props.user;
    console.log("USER ESSAM :", user);
    if (user.user) {
      access = user.user.accessToken;
      refresh = user.user.refreshToken;
    }
  }, []);

  if (props.user.user) {
    console.log("IN IF ESSAM", props.user.user);
    axios
      .get(`http://localhost:5000/calendar/get`, {
        params: {
          access: props.user.user.accessToken,
          refresh: props.user.user.refreshToken,
        },
      })
      .then((response) => {
        if (response) {
          console.log("hit response calendar axios call", response.data);
        } else {
          console.log("hit error in calendar get axios call");
        }
      });
  }

  useEffect(() => {
    props.fetchUser();
    // axios call to get the data:
    axios
      .get(`http://localhost:5000/events/get/${eventID}`)
      .then((response) => {
        if (response) {
          console.log("hit response in eventPage", response);
          // eventInfo = response.data;
          console.log("RESPONSE DATAA: ", response.data);
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
      console.log("CHECK Essam: ", props.user.user.id, eventData.hostID);
      console.log("CHECK Essam: ", props.user.user.id === eventData.hostID);
      if (props.user.user.id === eventData.hostID) setInputDisabled(false);
    }
  }, []);
  console.log("ISHOST : ", isHost);

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
  const [days, setDays] = useState([
    {
      id: 0,
      date: "4/12/2021",
      group: 0,
      first: true,
      times: JSON.parse(JSON.stringify(intervals)),
    },
    {
      id: 1,
      date: "4/13/2021",
      group: 0,
      first: false,
      times: JSON.parse(JSON.stringify(intervals)),
    },
    {
      id: 2,
      date: "4/22/2021",
      group: 1,
      first: true,
      times: JSON.parse(JSON.stringify(intervals)),
    },
    {
      id: 3,
      date: "4/23/2021",
      group: 1,
      first: false,
      times: JSON.parse(JSON.stringify(intervals)),
    },
    {
      id: 4,
      date: "4/24/2021",
      group: 1,
      first: false,
      times: JSON.parse(JSON.stringify(intervals)),
    },
    {
      id: 5,
      date: "4/25/2021",
      group: 1,
      first: false,
      times: JSON.parse(JSON.stringify(intervals)),
    },
    {
      id: 6,
      date: "4/26/2021",
      group: 1,
      first: false,
      times: JSON.parse(JSON.stringify(intervals)),
    },
    {
      id: 7,
      date: "4/27/2021",
      group: 1,
      first: false,
      times: JSON.parse(JSON.stringify(intervals)),
    },
  ]);
  const calendars = [
    { id: 0, calendarLabel: "Personal Calendar", times: calendar1_intervals },
    { id: 1, calendarLabel: "UCD Calendar", times: calendar2_intervals },
    { id: 2, calendarLabel: "Komma Calendar", times: calendar3_intervals },
  ];
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
                days={days}
                setDays={setDays}
                inputDisabled={inputDisabled}
                numResponses={numResponses}
                calendars={calendars}
              />
            ) : (
              <GroupCalendar
                viewingGroup={viewingGroup}
                intervals={intervals}
                days={days}
                setDays={setDays}
                inputDisabled={inputDisabled}
                numResponses={numResponses}
              />
            )}
          </div>
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
