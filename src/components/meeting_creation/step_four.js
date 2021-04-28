import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/step_four.css";
import axios from "axios";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { fetchUser } from "../../Redux/actions/userActions";
import { updateEvent } from "../../Redux/actions/eventActions";

function StepFour(props) {
  const [numDaysSelected, setNumDaysSelected] = useState(true);
  const [numResponsesSelected, setNumResponsesSelected] = useState(false);
  const [numDays, setNumDays] = useState(7);
  const [numResponses, setNumResponses] = useState(5);
  const [notifyMeSelected, setNotifyMeSelected] = useState(false);
  const [keepHiddenSelected, setKeepHiddenSelected] = useState(false);
  let history = useHistory();

  useEffect(() => {
    props.fetchUser();
  }, []);
  var curEvent = props.event;

  curEvent = {
    ...curEvent,
    daysSentAfter: numDays,
    numDaysSelected: numDaysSelected,
    respondedSentAfter: numResponses,
    notifyOnResponse: notifyMeSelected,
    availabilityHidden: keepHiddenSelected,
  };

  console.log("hit FINAL EVENT State: ", curEvent);
  function next() {
    console.log("hit Previous EVENT State: ", props.event);
    var eventID = "null";

    // // // Make axios call
    var postArgs = {};
    if (curEvent.numDaysSelected) {
      postArgs = {
        title: props.event.meetingName,
        hostName: props.user.user.name,
        hostID: props.user.user.id,

        description: props.event.description,
        location: props.event.address,
        timePeriod: props.event.timePeriod,
        meetingStartTime: props.event.meetingStartTime,
        meetingEndTime: props.event.meetingEndTime,
        maxTimeRange: props.event.maxTimeRange,

        respondentName: [],
        respondentEmail: [],
        daysSentAfter: curEvent.daysSentAfter,
        // respondedSentAfter:
        sendInDaysBool: curEvent.numDaysSelected,
        notifyOnResponse: curEvent.notifyOnResponse,
        availabilityHidden: curEvent.availabilityHidden,
      };
    } else {
      postArgs = {
        hostID: props.user.user.id,
        hostName: props.user.user.name,
        title: props.event.meetingName,
        description: props.event.description,
        location: props.event.address,
        timePeriod: props.event.timePeriod,
        meetingStartTime: props.event.meetingStartTime,
        meetingEndTime: props.event.meetingEndTime,
        maxTimeRange: props.event.maxTimeRange,
        sendInDaysBool: curEvent.numDaysSelected,

        respondentName: [],
        respondentEmail: [],
        // daysSentAfter:
        respondedSentAfter: curEvent.respondedSentAfter,
        notifyOnResponse: curEvent.notifyOnResponse,
        availabilityHidden: curEvent.availabilityHidden,
      };
    }

    console.log("ESSAM CHCK: ", postArgs)
    axios.post(`http://localhost:5000/events/add`, postArgs).then((res) => {
      console.log("in this .then part");
      console.log(`EVENT ADDED TO USER ${res.data}`);
      saveData();
      history.push(`/availability/${res.data._id}`);
    });
  }

  function back() {
    saveData();
    props.setActiveStep(3);
  }
  function saveData() {
    let data = props.data;
    data.num_days = numDaysSelected ? numDays : 0;
    data.num_responses = numResponsesSelected ? numResponses : 0;
    data.notify_me = notifyMeSelected;
    data.keep_hidden = keepHiddenSelected;
    props.setData(data);
    console.log(props.data);
  }

  function changeNotifyMeSelected() {
    if (notifyMeSelected) setNotifyMeSelected(false);
    else setNotifyMeSelected(true);
  }

  function changeKeepHiddenSelected() {
    if (keepHiddenSelected) setKeepHiddenSelected(false);
    else setKeepHiddenSelected(true);
  }

  function handleNumDaysChange(event) {
    const re = /^[0-9\b]+$/; // Only allow positive integer input
    if (re.test(event.target.value) && event.target.value[0] != 0)
      setNumDays(event.target.value);
    else if (event.target.value == "") { 
        setNumDays(event.target.value); 
      } 
  }

  function handleNumResponsesChange(event) {
    const re = /^[0-9\b]+$/; // Only allow positive integer input
    if (re.test(event.target.value) && event.target.value[0] != 0)
      setNumResponses(event.target.value);
    else if (event.target.value == "") { 
      setNumResponses(event.target.value);
    } 
    console.log(event.target.value == ""); 
  }

  return (
    props.activeStep == 4 && (
      <div className="row no-gutters justify-content-center">
        <div className="col-md-7">
          <div className="shadow-card">
            <div className="when-send">
              <h3 className="bold">
                💌️ When would you like us to send out invites?
              </h3>
              <p>Your guests will be asked for their emails when responding.</p>
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  id="num-days"
                  name="whenSend"
                  checked={numDaysSelected}
                  onChange={() => {
                    setNumDaysSelected(true);
                    setNumResponsesSelected(false);
                  }}
                />
                <label className="custom-control-label" for="num-days">
                  &nbsp;&nbsp;In
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={numDays}
                    disabled={!numDaysSelected}
                    onChange={handleNumDaysChange}
                  />
                  days
                </label>
              </div>
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  id="num-responses"
                  name="whenSend"
                  checked={numResponsesSelected}
                  onChange={() => {
                    setNumDaysSelected(false);
                    setNumResponsesSelected(true);
                  }}
                />
                <label className="custom-control-label" for="num-responses">
                  &nbsp;&nbsp;After
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={numResponses}
                    disabled={!numResponsesSelected}
                    onChange={handleNumResponsesChange}
                  />
                  people respond, other than you
                </label>
              </div>
            </div>

            <div className="options">
              <h3 className="bold">⚡️ Additional Options</h3>
              <p>These features aren't quite ready yet. Check back soon!</p>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="notify"
                  onClick={changeNotifyMeSelected}
                  disabled
                />
                <label className="custom-control-label" for="notify">
                  &nbsp;&nbsp;Notify me each time someone responds
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="hidden"
                  onClick={changeKeepHiddenSelected}
                  disabled
                />
                <label className="custom-control-label" for="hidden">
                  &nbsp;&nbsp;Keep my availability hidden from respondents
                </label>
              </div>
            </div>

            <div className="next">
              <h3 className="bold">😄️️ So what’s next?</h3>
              <p>Share the link on the next page with your guests.</p>
              <p>
                We’ll send out meeting invites
                {(() => {
                  if (numDaysSelected) {
                    if (numDays == 1) return " in 1 day.";
                    else return " in " + numDays + " days.";
                  } else {
                    return " after " + numResponses + " people respond.";
                  }
                })()}
              </p>
              <p>Be sure to add your availability as well!</p>
            </div>

            <div className="nav-buttons row no-gutters">
              <div className="col-12">
                <p className="label end-message">
                  Everything look correct? Then let’s rock n’ roll. 🎸
                </p>
              </div>
              <div className="col">
                <button className="hollow-button" onClick={back}>
                  Back
                </button>
              </div>
              <div className="col d-flex justify-content-end">
                {(() => {
                  console.log(numResponses == "" && numResponsesSelected, numDays == "" && numDaysSelected)
                  if ((numResponses == "" && numResponsesSelected) || (numDays == "" && numDaysSelected)) 
                    return (
                      <button disabled className="disabled-button">
                        Confirm Meeting
                      </button>
                    );
                  else
                    return (
                      <button className="solid-button" onClick={next}>
                        Confirm Meeting
                      </button>
                    );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

StepFour.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  event: PropTypes.array.isRequired,
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event.newEvent,
  user: state.user.user,
});

export default connect(mapStateToProps, { updateEvent, fetchUser })(StepFour);
