import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/home.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { fetchUser } from "../../src/Redux/actions/userActions";
import { fetchCalendar } from "../../src/Redux/actions/calendarActions";

import googleCompanyLogo from "../img/google_company_logo.png";

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

    console.log("hit fetchuser", props.fetchUser());
  }, []);

  if (props.calendar)
    console.log("CALENDAR REDUX: ", props.calendar.events);
  console.log("USER REDUX: ", props.user.accessToken);

  return (
    <div className="home-wrapper">
      <div className="row justify-content-center title-container">
        <div className="col-md-10">
          <h1 className="black title">Fast⚡and friendly 😄 meeting scheduling</h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="shadow-card">
            <p>
              Thanks for checking out the Komma preview as part of PLASMA Demo Day 2021. We are currently in beta, so platform functionality may be limited. This limited preview will close after the event. We would love for you to join our beta waitlist below for continued access to the platform.
            </p>
            <form action="https://forms.gle/DWAw2XHY9tuAu5VT8">
              <button className="solid-button">Beta Sign Up</button>
            </form>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="shadow-card">
            <p>
              Beta testers and invite respondents, please provide bug reports, feature requests, and general feedback here. Submit comments as often as you like. We appreciate your support.
            </p>
            <form action="https://forms.gle/Fqwz6CS5FuACRxTS6">
              <button className="solid-button">Feedback Form</button>
            </form>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="shadow-card">
            <h4 className="welcome-text">Find a time for a group meeting, without the back and forth. Sign in to get started.</h4>
            <button 
              className="google-button" 
              onClick={() => {
                window.open("http://localhost:5000/auth/google", "_self");
              }}
            >
              <img src={googleCompanyLogo} className="google-company-logo" />
              Sign In With Google
            </button>
          </div>
        </div>
      </div>

    </div>

      /* <button
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
      </button> */
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
