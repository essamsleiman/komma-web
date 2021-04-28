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
  const [numResponses, setNumResponses] = useState(-1);

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

  function createCalendarList(eventData, calendarEvents) {
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

    // Events from a person's calendar on the current day only pull after the current time - meaning previous time blocks won't be pulled
    // Events that start before the time blocks start for a day are not parsed through to show up as red for the time blocks that they do cover (i.e. event starts at 830, but meeting blocks start at 9)
    // When a new month starts, there is first an empty day on the availabilities UI and then the days start populating by one day delayed
    for (let i = 0; i < calendarEvents.items.length; i++) {
      var startDateOfEvent = new Date(calendarEvents.items[i].start.dateTime);
      // console.log("startDateOfEvent", startDateOfEvent);
      var endDateOfEvent = new Date(calendarEvents.items[i].end.dateTime);
      var dd = String(startDateOfEvent.getDate()).padStart(2, "0");
      var mm = String(startDateOfEvent.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = startDateOfEvent.getFullYear();

      // To calculate the time difference of two dates
      var calendarDay = new Date(yyyy, mm, dd); //12 midnight
      var createdDay = new Date(yyyyCreated, mmCreated, ddCreated);
      var Difference_In_Time = Math.abs(
        calendarDay.getTime() - createdDay.getTime()
      );

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      // Difference_In_Days;

      var hr = String(startDateOfEvent.getHours()).padStart(2, "0");
      var hrend = parseInt(String(endDateOfEvent.getHours()).padStart(2, "0"));
      var min = String(startDateOfEvent.getMinutes()).padStart(2, "0");
      var minend = String(endDateOfEvent.getMinutes()).padStart(2, "0");
      // var hrDistance = hrStartRange -
      var timeRange = (parseInt(hr) - parseInt(hrStartRange)) * 2;
      var timeRangeLate = (parseInt(hrend) - parseInt(hrStartRange)) * 2;
      if (min == "30") {
        timeRange++;
      }
      if (minStartRange == "30") {
        timeRange--;
      }

      console.log(
        "ESSAM CALENDAR LIST: ",
        calendarList,
        "i",
        i,
        "diff: in days",
        Difference_In_Days,
        "calendar events:",
        calendarEvents.items
      );

      // temporary fix to new month not working :)
      if (mmCreated != mm) {
        --Difference_In_Days;
      }
      if (
        (timeRange < 0 && timeRangeLate < 0) ||
        timeRange >= calendarList[Difference_In_Days].length
      ) {
        console.log(
          "hit in timerange if statement - timerange:",
          timeRange,
          "calendar list length",
          calendarList[Difference_In_Days].length,
          "i",
          i,
          "timerangelate",
          timeRangeLate
        );
        continue;
      }

      // so get total time amount: i.e. 10am - 11:30am = 1h30 = 90min:
      // 90min / 30 min (1/2 hr) = 3 - (3 half hour time blocks) => call this t
      // startDateOfEvent and endDateOfEvent
      // another for loop from i = 0 -> i = t

      // this stuff here is to get each of the hour intervals
      let hoursTotal = hrend - parseInt(hr);
      let minTotal = minend - min; // time 10:30 - 11:00 = -30
      hoursTotal = hoursTotal * 60;
      let totalTime = hoursTotal + minTotal;
      let t = Math.ceil(totalTime / 30);
      for (let i = 0; i < t; ++i) {
        if (timeRange + i < calendarList[Difference_In_Days].length)
          calendarList[Difference_In_Days][timeRange + i] = true;
      }
      // function end
    }

    for (let i = 0; i < calendarList.length; i++) {
      for (let j = 0; j < calendarList[i].length; ++j) {
        let temp = calendarList[i][j];
        calendarList[i][j] = ["", temp];
      }
    }
    console.log(calendarList);
    setCalendarListState(calendarList);
  }
  // var numResponses = -1;

  useEffect(() => {
    user = props.user;

    // grab the date of event creation and generate start and end dates
    var dateCreated = new Date(eventData.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
    var first = new Date(dateCreated);
    var end = new Date(dateCreated);
    end.setDate(end.getDate() + eventData.maxTimeRange);

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
    props.fetchUser()
    axios
      .get(`http://localhost:5000/events/get/${eventID}`)
      .then((responseEvent) => {
        if (responseEvent) {
          console.log("hit response in eventPage", responseEvent);
          setNumResponses(responseEvent.data.daysObject[0].times[0][2]);
          console.log("hit numresponses", numResponses);
          setEventData(responseEvent.data);
          setDaysState(eventData.daysObject);
        } else {
          console.log("hit error in eventPage axios call");
        }
        fetch("http://localhost:5000/auth/success", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
          })
          .then((responseJson) => {
            if (responseJson) {
              console.log("responseJson", responseJson);
              console.log("ESSSSSAAAAAM CHECK: ", responseEvent)
              setDaysState(responseEvent.data.daysObject);
              var dateCreated = new Date(responseEvent.data.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
              var first = new Date(dateCreated);
              var end = new Date(dateCreated);
              end.setDate(end.getDate() + responseEvent.data.maxTimeRange);

              axios
                .get(`http://localhost:5000/calendar/get`, {
                params: {
                  // access and refresh tokens being passed in
                  access: responseJson.user.accessToken,
                  refresh: responseJson.user.refreshToken,
                  // time min and max parameters being passed in
                  timeMin: first,
                  timeMax: end,
                },
            })
            .then((response) => {
              if (response) {
                console.log("hit CALENDAR EVENTS: ", response.data);
                for (let i = 0; i < response.data.items.length; ++i) {
                  console.log("hit dates", response.data.items[i].start);
                }

                setCalendarEvents(response.data);
                createCalendarList(responseEvent.data, response.data)
                // createCalendarList();
                // setupDates();
              } else {
                console.log("hit error in calendar get axios call");
              }
            });


          

            } else {
              console.log("no response from server");
            }
          })
          .catch((error) => {
            console.log(`error1: ${error}`);
          });
        });
    // axios call to get the data:
    // axios
    //   .get(`http://localhost:5000/events/get/${eventID}`)
    //   .then((response) => {
    //     if (response) {
    //       console.log("hit response in eventPage", response);
    //       setNumResponses(response.data.daysObject[0].times[0][2]);
    //       console.log("hit numresponses", numResponses);
    //       setEventData(response.data);
    //       setDaysState(eventData.daysObject);
    //     } else {
    //       console.log("hit error in eventPage axios call");
    //     }
    //   });
    // alert("axios call finished");
  }, []);

  useEffect(() => {
    if (props.user.user) {
      if (props.user.user.id === eventData.hostID) {
        setInputDisabled(false);
      }
    }
  }, []);

  const [userInfo, setUserInfo] = useState({
    signedIn: false,
    name: "",
    email: "",
    googleName: "Edward Chew",
    googleEmail: "edward@email.com",
  });

  // Create new Date instance
  var date = new Date();

  // Add a day
  date.setDate(date.getDate() + 1);
  const [daysState, setDaysState] = useState([]);

  console.log("DAYS STATE: availability", daysState);

  function format(date) {
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  }

  function setupDates() {
    // setDaysState(eventData.daysObject);
    // var dateCreated = new Date(eventData.dateOfEventCreation); // "2021-04-21T17:45:35.198Z"
    // var first = new Date(dateCreated);
    // var end = new Date(dateCreated);
    // end.setDate(end.getDate() + eventData.maxTimeRange);
    // if (props.user.user) {
      // axios
      //   .get(`http://localhost:5000/calendar/get`, {
      //     params: {
      //       // access and refresh tokens being passed in
      //       access: props.user.user.accessToken,
      //       refresh: props.user.user.refreshToken,
      //       // time min and max parameters being passed in
      //       timeMin: first,
      //       timeMax: end,
      //     },
      //   })
      //   .then((response) => {
      //     if (response) {
      //       console.log("hit CALENDAR EVENTS: ", response.data);
      //       for (let i = 0; i < response.data.items.length; ++i) {
      //         console.log("hit dates", response.data.items[i].start);
      //       }

      //       setCalendarEvents(response.data);

      //       // createCalendarList();
      //       // setupDates();
      //     } else {
      //       console.log("hit error in calendar get axios call");
      //     }
      //   });

      // axios
      //   .get(`http://localhost:5000/calendar/getCalendars`, {
      //     params: {
      //       // access and refresh tokens being passed in
      //       access: props.user.user.accessToken,
      //       refresh: props.user.user.refreshToken,
      //     },
      //   })
      //   .then((response) => {
      //     if (response) {
      //       console.log("hit get the calendars", response.data);
      //     } else {
      //       console.log("hit error in calender list get axios call")
      //     }
      //   });
    // }
    // createCalendarList();
  }
  console.log("DAYSSTATE NEW ESSAM: ", daysState);

  // events data is stored in the state: calendarEvents

  const calendars = [
    {
      id: 0,
      calendarLabel: calendarEvents.summary,
      // times: calendar1_intervals,
      times: calendarListState,
    },
  ];

  // const numResponses = 3;
  console.log("props.user.user", props.user.user);
var isHost;
  
  // console.log("JAMES CHECK: ", isHost)
  if (props.user.user === {} || typeof props.user.user === "undefined" || typeof eventData.hostID === "undefined" || typeof daysState === "undefined" ) {
    console.log("props.user.user: ", props.user.user, "eventData", eventData, "daysState", daysState)
    return <div>Loading...</div>;
  } else {
     isHost =
     typeof props.user.user !== "undefined" && props.user.user !== {}
      ? props.user.user.id === eventData.hostID
      : false;
    if(isHost == false) {
      console.log("HOST IS FALSE: ", "props.user.user", props.user.user, "eventData.hostID", eventData.hostID)
    }
    console.log("EVENTDATA", eventData);
    return (
      <div>
        <div className="row no-gutters justify-content-center shadow-card top-margin">
          <div className="col-3">
            <LeftBar
              viewingGroup={viewingGroup}
              eventData={eventData}
              setViewingGroup={setViewingGroup}
              respondents={eventData.respondentName}
              title={eventData.title}
              meetingDuration={eventData.timePeriod}
              isHost={isHost}
              urlId={window.location.pathname}
            />
          </div>
          <div className="col-9">
            <div className="vertical-bar"></div>
            <TopBar
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setInputDisabled={setInputDisabled}
              meetingHostName={eventData.hostName}
              isMeetingHost={isHost}
              urlId={window.location.pathname}
            />
            {!viewingGroup ? (
              <InputCalendar
                viewingGroup={viewingGroup}
                intervals={intervals}
                days={daysState}
                setDays={setDaysState}
                inputDisabled={inputDisabled}
                numResponses={numResponses}
                calendars={calendars}
                eventId={eventID}
                eventData={eventData}
                email={props.user.user.email}
                name={props.user.user.name}
              />
            ) : (
              <GroupCalendar
                viewingGroup={viewingGroup}
                intervals={daysState}
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
