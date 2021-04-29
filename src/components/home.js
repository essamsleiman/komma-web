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

export default function Home(props) {
  let history = useHistory();

  // create event testing function
  // function createEvent() {
  //   var fields = {
  //     name : "James' New Event",
  //     hostname : "James R. Junaidi",
  //     meetingInviteLink : "",
  //     googleMeetLink : "",
    
  //     title : "The event",
  //     description : "random desc.",
  //     location : "United States",
  //     minTimeRange : "2021-04-01T09:00:00-07:00",
  //     maxTimeRange : "2021-04-01T09:00:00-09:00",
  //   } 

  //   // axios post request to add the new event into here.
  //   // axios.post("http://login.getkomma.com/events/add", fields).then((response) => {
  //   //   console.log("hit response", response);
  //   // }, (error) => {
  //   //   console.log("hit error :(", error);
  //   // });
  // }

  function signin() {}
  // console.log("COOKIE", document.cookie);
  // useEffect(() => {


  //   // console.log("hit fetchuser", props.fetchUser());
  // }, []);

  // if (props.calendar)
  //   console.log("CALENDAR REDUX: ", props.calendar.events);
  // console.log("USER REDUX: ", props.user.accessToken);

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
            <p className="welcome-text">
              Thanks for checking out the Komma as part of PLASMA Demo Day 2021. Our site will be launching next week in out first beta version. Sign up with the form below to join the beta waitlist and use the platform before our official launch!
            </p>
            <div className="row">
              <form target="_blank" action="https://forms.gle/DWAw2XHY9tuAu5VT8" style={{marginRight: "1rem"}}>
                <button className="solid-button">Beta Sign Up</button>
              </form>
              {/* <form target="_blank" action="https://forms.gle/Fqwz6CS5FuACRxTS6">
                <button className="solid-button">Feedback Form</button>
              </form> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="shadow-card">
            <p className="welcome-text">
              Check out our video below to learn more about Komma and see a demo!
            </p>
            <iframe className="video-embed" src="https://www.youtube.com/embed/QG2nPoob260" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      {/* <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="shadow-card">
            <h4 className="welcome-text">Find a time for a group meeting, without the back and forth. Sign in to get started.</h4>
            <p className="welcome-text">Please note we are pending verification from Google - if a message appears that we aren't verified, click advanced -> Go to Komma</p>
            <button 
              className="google-button" 
              onClick={() => {
                console.log("NO")
                window.open("http://login.getkomma.com/auth/google", "_self");
              }}
            >
              <img src={googleCompanyLogo} className="google-company-logo" />
              Sign In With Google
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

// Home.propTypes = {
//   fetchUser: PropTypes.func.isRequired,
//   user: PropTypes.array.isRequired,
//   fetchCalendar: PropTypes.func.isRequired,
//   calendar: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
//   calendar: state.calendar.calendar.data,
//   user: state.user.user,
// });

// export default connect(mapStateToProps, { fetchUser, fetchCalendar })(Home);
// export default Home