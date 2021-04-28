import react, { useState, useEffect } from "react";
import Dropdown from "../dropdown";
import DatePicker from "./date_picker";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/step_three.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateEvent } from "../../Redux/actions/eventActions";
import { timeConversion } from "../utils.js";
function StepThree(props) {
  const meetingLengths = [
   
    {
      label: "30 minute",
      value: "30",
    },
   
    {
      label: "60 minute",
      value: "60",
    },
    {
      label: "90 minute",
      value: "90",
    },
  ];

  const meetingTimes = [
    {
      label: "12am",
      value: "00:00",
    },
    {
      label: "1am",
      value: "01:00",
    },
    {
      label: "2am",
      value: "02:00",
    },
    {
      label: "3am",
      value: "03:00",
    },
    {
      label: "4am",
      value: "04:00",
    },
    {
      label: "5am",
      value: "05:00",
    },
    {
      label: "6am",
      value: "06:00",
    },
    {
      label: "7am",
      value: "07:00",
    },
    {
      label: "8am",
      value: "08:00",
    },
    {
      label: "9am",
      value: "09:00",
    },
    {
      label: "10am",
      value: "10:00",
    },

    {
      label: "11pm",
      value: "11:00",
    },
    {
      label: "12pm",
      value: "12:00",
    },
    {
      label: "1pm",
      value: "13:00",
    },
    {
      label: "2pm",
      value: "14:00",
    },
    {
      label: "3pm",
      value: "15:00",
    },
    {
      label: "4pm",
      value: "16:00",
    },
    {
      label: "5pm",
      value: "17:00",
    },
    {
      label: "6pm",
      value: "18:00",
    },
    {
      label: "7pm",
      value: "19:00",
    },
    {
      label: "8pm",
      value: "20:00",
    },
    {
      label: "9pm",
      value: "21:00",
    },
    {
      label: "10pm",
      value: "22:00",
    },
    {
      label: "11pm",
      value: "23:00",
    },
  ];

  const meetingRanges = [
    {
      label: "the next day",
      value: 1,
    },
    {
      label: "the next 2 days",
      value: 2,
    },
    {
      label: "the next 3 days",
      value: 3,
    },
    {
      label: "the next 4 days",
      value: 4,
    },
    {
      label: "the next 5 days",
      value: 5,
    },
    {
      label: "the next 6 days",
      value: 6,
    },
    {
      label: "the next 7 days",
      value: 7,
    },
  ];

  const timeZones = [
    {
      label: "Los Angeles (GMT-8)",
      value: "Los Angeles (GMT-8)",
    },
    {
      label: "New York (GMT-5)",
      value: "New York (GMT-5)",
    },
  ];

  const meetingDurationsMinutes = [
    {
      label: "30",
      value: "30",
    },
    {
      label: "60",
      value: "60",
    },
    {
      label: "90",
      value: "90",
    },
  ];

  const meetingDurationsHours = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
  ];

  const meetingDurationUnits = [
    {
      label: "minutes",
      value: "minutes",
    },
    {
      label: "hours",
      value: "hours",
    },
  ];

  const [meetingLength, setMeetingLength] = useState("60");
  const [meetingLengthLabel, setMeetingLengthLabel] = useState("60 minute"); 
  const [meetingStartTime, setMeetingStartTime] = useState(
    meetingTimes[9].label
  );
  const [meetingEndTime, setMeetingEndTime] = useState(meetingTimes[15].label);
  const [meetingEndTimes, setMeetingEndTimes] = useState(
    meetingTimes.slice(10)
  );
  const [meetingRange, setMeetingRange] = useState("the next 7 days");
  const [timeZone, setTimeZone] = useState("Los Angeles (GMT-8)");
  const [meetingDuration, setMeetingDuration] = useState("60");
  const [meetingDurations, setMeetingDurations] = useState(
    meetingDurationsMinutes
  );
  const [meetingDurationUnit, setMeetingDurationUnit] = useState("minutes");
  const [selectedDays, setSelectedDays] = useState([]);

  console.log("OBJECT", {
    meetingLength,
    meetingStartTime,
    meetingEndTime,
    meetingEndTimes,
    meetingRange,
    timeZone,
    meetingDuration,
    meetingDurations,
    meetingDurationUnit,
    selectedDays,
  });
  function changeAdvancedDisplay() {
    let isVisible = props.showAdvanced;
    props.setShowAdvanced(!isVisible);
  }

  function onMeetingLengthChange(item, name) {
    setMeetingLength(item.value);
    setMeetingLengthLabel(item.label); 
  }

  function onMeetingStartTimeChange(item, name) {
    setMeetingStartTime(item.label);
    let time = meetingTimes.find((time) => time.label == item.label);
    let startPosition = meetingTimes.indexOf(time);
    if (startPosition == meetingTimes.length - 1) {
      setMeetingEndTimes(meetingTimes.slice(0, meetingTimes.length - 1));
      setMeetingEndTime(meetingTimes[0].label);
    } else if (startPosition != -1) {
      setMeetingEndTimes(meetingTimes.slice(startPosition + 1));
      let time = meetingTimes.find((time) => time.label == meetingEndTime);
      let endPosition = meetingTimes.indexOf(time);
      if (endPosition <= startPosition) {
        setMeetingEndTime(meetingTimes[startPosition + 1].label);
      }
    }
  }

  function onMeetingEndTimeChange(item, name) {
    setMeetingEndTime(item.label);
  }

  function onMeetingRangeChange(item, name) {
    setMeetingRange(item.label);
  }

  function onTimeZoneChange(item, name) {
    setTimeZone(item.label);
  }

  function onMeetingDurationChange(item, name) {
    setMeetingDuration(item.label);
  }

  function onMeetingDurationUnitChange(item, name) {
    if (item.label != meetingDurationUnit) {
      setMeetingDurationUnit(item.label);
      if (item.label == "minutes") {
        setMeetingDurations(meetingDurationsMinutes);
        setMeetingDuration("60");
      } else {
        setMeetingDurations(meetingDurationsHours);
        setMeetingDuration("1");
      }
    }
  }
  //   console.log("meetingLength", meetingLength);
  //   console.log("meetingStartTime", meetingStartTime);
  //   console.log("meetingEndTime", meetingEndTime);
  var meetingRangeInt = 0;
  function next() {
    for (let i = 0; i < meetingRanges.length; i++) {
      //   console.log("meetingRange Each", meetingRange, meetingRanges[i]);

      if (meetingRange == meetingRanges[i].label) {
        meetingRangeInt = parseInt(meetingRanges[i].value);
        break;
      }
    }
    var meetingStartTimeValue = "";
    var meetingEndTimeValue = "";

    // console.log("meetingRange HIT", meetingRangeInt);

    console.log("EVENT CURR: ", props.event);
    var meetingLengthInt = parseInt(meetingLength);

    var curEvent = props.event;
    curEvent = {
      ...curEvent,
      timePeriod: meetingLengthInt,
      meetingStartTime: timeConversion(meetingStartTime),
      meetingEndTime: timeConversion(meetingEndTime),
      maxTimeRange: meetingRangeInt,
    };
    console.log("curEvent", curEvent);
    props.updateEvent(curEvent);

    saveData();
    props.setActiveStep(4);
  }

  function saveData() {
    let data = props.data;
    data.meetingLength = props.showAdvanced ? "" : meetingLength;
    data.meetingRange = props.showAdvanced ? "" : meetingRange;
    data.meetingDuration = props.showAdvanced ? meetingDuration : "";
    data.meetingDurationUnit = props.showAdvanced ? meetingDurationUnit : "";
    data.meetingStartTime = meetingStartTime;
    data.meetingEndTime = meetingEndTime;
    data.timeZone = timeZone;
    props.setData(data);
  }

  function back() {
    props.setActiveStep(2);
  }

  return (
    props.activeStep == 3 && (
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-sm-11 container">
            <div className="shadow-card">
              <h3 className="bold">
                ⏰ What general time range would be best?
              </h3>
              <label class="switch">
                <input
                  type="checkbox"
                  checked={props.showAdvanced}
                  onClick={changeAdvancedDisplay}
                  disabled
                />
                <span class="slider round disabled" disabled></span>
              </label>
              <div className="advanced-select-text-wrapper">
                <p className="label">Advanced Date Selection (This feature isn't quite ready yet. Check back soon!)</p>
              </div>
              <br />
              {!props.showAdvanced && (
                <>
                  <p className="left-inline-text">A</p>
                  <div className="dropdown-wrapper">
                    <Dropdown
                      name="length"
                      title={meetingLengthLabel}
                      list={meetingLengths}
                      setter={setMeetingLength}
                      size="dd-wrapper-medium"
                      enableScroll="dd-no-scroll"
                      onChange={onMeetingLengthChange}
                    />
                  </div>
                  <p className="middle-inline-text">meeting between</p>
                  <div className="dropdown-wrapper">
                    <Dropdown
                      name="length"
                      title={meetingStartTime}
                      list={meetingTimes}
                      setter={setMeetingLength}
                      size="dd-wrapper-small"
                      enableScroll="dd-scroll"
                      onChange={onMeetingStartTimeChange}
                    />
                  </div>
                  <p className="middle-inline-text">and</p>
                  <div className="dropdown-wrapper">
                    <Dropdown
                      name="meetingEndTime"
                      title={meetingEndTime}
                      list={meetingEndTimes}
                      setter={setMeetingLength}
                      size="dd-wrapper-small"
                      enableScroll="dd-scroll"
                      onChange={onMeetingEndTimeChange}
                    />
                  </div>
                  <p className="middle-inline-text">in</p>
                  <div className="dropdown-wrapper">
                    <Dropdown
                      name="length"
                      title={meetingRange}
                      list={meetingRanges}
                      setter={setMeetingLength}
                      size="dd-wrapper-large"
                      enableScroll="dd-no-scroll"
                      onChange={onMeetingRangeChange}
                    />
                  </div>
                </>
              )}
              {props.showAdvanced && (
                <>
                  <div className="row no-gutters">
                    <div className="col-sm-8">
                      <p className="bold">Select Dates</p>
                    </div>
                    <div className="col-sm-4">
                      <p className="bold">Select Time Range *</p>
                    </div>
                    <div className="col-sm-8">
                      <DatePicker setSelectedDays={setSelectedDays} />
                    </div>
                    <div className="col-sm-4">
                      <p className="label advanced-inline-text">
                        Earliest Time
                      </p>
                      <p className="label advanced-inline-text advanced-text-padding">
                        Latest Time
                      </p>{" "}
                      <br />
                      <div className="dropdown-wrapper">
                        <Dropdown
                          name="length"
                          title={meetingStartTime}
                          list={meetingTimes}
                          setter={setMeetingLength}
                          size="dd-wrapper-small"
                          enableScroll="dd-scroll"
                          onChange={onMeetingStartTimeChange}
                        />
                      </div>
                      <p className="middle-inline-text">to</p>
                      <div className="dropdown-wrapper">
                        <Dropdown
                          name="meetingEndTime"
                          title={meetingEndTime}
                          list={meetingEndTimes}
                          setter={setMeetingLength}
                          size="dd-wrapper-small"
                          enableScroll="dd-scroll"
                          onChange={onMeetingEndTimeChange}
                        />
                      </div>
                      <p className="label advanced-middle-vertical-text">
                        Time Zone
                      </p>
                      <div className="dropdown-wrapper">
                        <Dropdown
                          name="length"
                          title={timeZone}
                          list={timeZones}
                          setter={setMeetingLength}
                          size="dd-wrapper-large"
                          enableScroll="dd-scroll"
                          onChange={onTimeZoneChange}
                        />
                      </div>
                      <p
                        className="label advanced-middle-vertical-text"
                        style={{ paddingTop: "20px" }}
                      >
                        Meeting Duration
                      </p>
                      <div className="dropdown-wrapper">
                        <Dropdown
                          name="meetingDuration"
                          title={meetingDuration}
                          list={meetingDurations}
                          setter={setMeetingLength}
                          size="dd-wrapper-small"
                          enableScroll="dd-no-scroll"
                          onChange={onMeetingDurationChange}
                        />
                      </div>
                      <div className="dropdown-wrapper double-dropdown-padding">
                        <Dropdown
                          name="meetingDurationUnit"
                          title={meetingDurationUnit}
                          list={meetingDurationUnits}
                          setter={setMeetingLength}
                          size="dd-wrapper-small"
                          enableScroll="dd-no-scroll"
                          onChange={onMeetingDurationUnitChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="nav-buttons row no-gutters">
                <div className="col">
                  <button className="hollow-button" onClick={back}>
                    Back
                  </button>
                </div>
                <div className="col d-flex justify-content-end">
                  <button className="solid-button" onClick={next}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

StepThree.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  event: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event.newEvent,
});

export default connect(mapStateToProps, { updateEvent })(StepThree);
