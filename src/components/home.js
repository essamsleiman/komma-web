import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { fetchUser } from "../../src/Redux/actions/userActions";
import { fetchCalendar } from "../../src/Redux/actions/calendarActions";

const cookies = new Cookies();
var eventId = "123";

function Home(props) {
  let history = useHistory();

  // create event testing function
  function createEvent() {
    var fields = {
      name : "James' New Event",
      hostname : "James R. Junaidi",
      meetingInviteLink : "",
      googleMeetLink : "",
    
      title : "The event",
      description : "random desc.",
      location : "United States",
      minTimeRange : "2021-04-01T09:00:00-07:00",
      maxTimeRange : "2021-04-01T09:00:00-09:00",
    } 

    // axios post request to add the new event into here.
    axios.post("http://localhost:5000/events/add", fields).then((response) => {
      console.log("hit response", response);
    }, (error) => {
      console.log("hit error :(", error);
    });
  }

  function signin() {}
  console.log("COOKIE", document.cookie);
  useEffect(() => {
    //   val = profileInfoState.userEventData;
    // fetch("http://localhost:5000/auth/success", {
    //   method: "GET",
    //   credentials: "include",
    // })
    //   .then((response) => {
    //     if (response.status === 200) return response.json();
    //     throw new Error("failed to authenticate user");
    //   })
    //   .then((responseJson) => {
    //     if (responseJson) {
    //       console.log("RESPONSE In HOme: ", responseJson);
    //       setUserToken(responseJson);
    //     } else {
    //       console.log("no response from server");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(`error: ${error}`);
    //   });

    props.fetchUser();
  }, []);
  if (props.calendar)
    console.log("CALENDAR REDUX: ", props.calendar.events);
  console.log("USER REDUX: ", props.user.accessToken);
  return (
    <div>
      <button
        onClick={() => {
          window.open("http://localhost:5000/auth/google", "_self");
        }}

        // onClick={() => {
        //   axios.get("http://localhost:5000/auth/google").then((response) => {

        //       if (response) {
        //         console.log("ESSAM RESPONSE: ",response)
        //       } else {
        //         console.log("no response from server");
        //       }
        //     });
        //window.open("http://localhost:5000/auth/events", "_self");
        // }}
      >
        Sign in with Google
      </button>
      <button
        onClick={() => {
          console.log("FRONTEND ERROR ESSAM");
          // console.log("userToken:", userToken);

          props.fetchCalendar(props.user.accessToken);
          // axios
          //   .get("http://localhost:5000/auth/events", {
          //     headers: {
          //       Authorization: `Bearer ${props.user.accessToken}`,
          //     },
          //   })
          //   .then((response) => {
          //     if (response) {
          //       console.log(response);
          //     } else {
          //       console.log("no response from server");
          //     }
          //   });
          //window.open("http://localhost:5000/auth/events", "_self");
        }}
      >
        Sync with Calendar
      </button>
      <button
        onClick={() => {
          // history.push(`/events/${eventId}`)
          history.push(`/events`)
        }}
      >
        Render an Event Page 
      </button>
      <button
        onClick={() => {
          // history.push(`/events/${eventId}`)
          window.open("http://localhost:5000/events")
        }}
      >
        Log the Events in Console
      </button>
      
      <button
        onClick={() => {
          createEvent();
        }}
      >
        add a new event to the DB
      </button>

    </div>
  );
}

Home.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  fetchCalendar: PropTypes.func.isRequired,
  calendar: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  calendar: state.calendar.calendar.data,
  user: state.user.user,
});

export default connect(mapStateToProps, { fetchUser, fetchCalendar })(Home);
