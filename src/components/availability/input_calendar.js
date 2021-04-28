/* 

This file contains all of the day's and their individual time blocks. 
It exists to serve as a wrapper over them for global CSS styles, more dynamic loading, 
and clean code. 

The placement of the hour blocks on the left hand side will also exist here. 
To get the text of the time to load, iterate over: 
props.intervals[i][0], where i is the current iteration of the loop and 
0 is the first element, the block's starting time represented in text form. 

*/

import react, { useState } from "react";
import "../css/input_calendar.css";
import DropdownMultiple from "../dropdown_multiple";
import DaySlots from "./day_slots";
import axios from "axios";
function InputCalendar(props) {
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState("none");
  
  function findCalendarLabels() {
    // console.log('calendars', props.calendars); 
    if (props.calendars == undefined) return;
    else {
      return props.calendars.map(function (calendar) {
        return { label: calendar["calendarLabel"], value: calendar["id"] };
      });
    }
  }

  function onCalendarChange(item, name) {
    let newSelectedCalendars = [];
    for (let i = 0; i < item.length; i++) {
      newSelectedCalendars.push(props.calendars[item[i].value].times);
    }
    setSelectedCalendars(newSelectedCalendars);
    props.setResponded(true);
    // Faster, better method that doesn't re-render and pass down into day_slots.js
    // console.log(selectedCalendars);
    // let newDays = props.days;
    // for (let i = 0; i < selectedCalendars.length; i++) { // each calendar
    //     for (let j = 0; j < newDays.length; j++) { // each day
    //         for (let k = 0; k < newDays[j].times.length; k++) { // each time slot
    //             if (selectedCalendars[i][j][k][1]) { // set unavailable if calendar indicates busy
    //                 newDays[j].times[k].push(false);
    //             }
    //             // console.log(selectedCalendars[i][j][k][1], props.days[i].times[j][2])
    //         }
    //     }
    // }
    // console.log(newDays);
    // setUnavailableHours(newDays);
  }

  function adjustIntervals() {
    let new_days = props.days;
    new_days[0].times[2][1] = "5/6";
    // console.log(new_days);
    props.setDays(JSON.parse(JSON.stringify(new_days)));
  }

  function getHourLabels() {
    let label_list = [];
    // Base labels off of first day in the list's times (props.days[0].times)
    label_list.push(getPrevHour());
    props.days[0].times.map((interval) => {
      let hour = parseInt(interval[0].split(":")[0]);
      let minutes = parseInt(interval[0].split(":")[1]);
      let twelveHour = ((hour + 11) % 12) + 1;
      let period = hour >= 12 ? "pm" : "am";
      if (minutes == "00")
        label_list.push(<p className="label">{twelveHour + " " + period}</p>);
    });
    return label_list;
  }

  function getPrevHour() {
    let firstHour = parseInt(props.days[0].times[0][0]);
    let period = firstHour >= 12 ? "pm" : "am";
    return <p className="label">{firstHour + " " + period}</p>;
  }

  // ** This function will only be used if we decide to store start times **
  function getNextHour() {
    // Check second to last interval to calculate
    // lastHour is the start time of the last interval (ex "10")
    let lastHour = parseInt(props.days[0].times.slice(-2)[0][0]);
    let nextHour = ((lastHour + 1 + 11) % 12) + 1;
    if (nextHour == 0) nextHour = 12;
    let period = lastHour >= 11 ? "pm" : "am";
    return <p className="label">{nextHour + " " + period}</p>;
  }

  // Update the internal availabilities object to be sent back to the DB
  function handleSendAvailability() {
    // let new_days = props.days
    var emails = props.eventData.respondentEmail;
    // console.log("hit emails: ", emails, props.email);
    if (emails.includes(props.email)) {
      alert(
        "You already responded! Sorry, the current beta does not support updating availabilities :("
      );
      return;
    }
    // make update api request here
    var parameters = {
      params: {
        email: props.email,
        name: props.name,
        daysState: props.days,
      },
    };

    console.log("PARAMS: ", parameters);
    axios
      .post(
        `http://localhost:5000/events/update/${props.eventId}`,
        {},
        {
          params: {
            email: props.email,
            name: props.name,
            daysState: props.days,
          },
        }
      )
      .then(
        (res) => {
          // console.log("SUCESSFULLY UPDATED");
          // console.log(`EVENT ADDED TO USER ${res.data}`);
        },
        (err) => {
          console.log("ERROR: ", err);
        }
      );

    // for (let day = 0; day < new_days.length; day++) {
    //     for (let block = 0; block < new_days[day].times.length; block++) {
    //         let old_attendance_num = new_days[day].times[block][1]
    //         let can_attend = parseInt(old_attendance_num.substring(0, old_attendance_num.indexOf(',')))
    //         let total_responses = parseInt(old_attendance_num.substring(old_attendance_num.indexOf(',') + 1))
    //         total_responses++;
    //         if (new_days[day].times[block][2]) { // can attend this time block
    //             new_days[day].times[block][1] = ++can_attend + '/' + total_responses
    //         }
    //         else { // cannot attend this time block
    //             new_days[day].times[block][1] = can_attend + '/' + total_responses
    //         }
    //     }
    // }

    // console.log(new_days)
    // props.setDays(JSON.parse(JSON.stringify(new_days)))
    setUnsavedChanges("false");
  }

  return (
    <div
      className={
        "input-cal-container top-content-container vertical-spacing" +
        (props.inputDisabled ? " disabled" : "")
      }
    >
      <div className="header">
        <p>Click and drag to indicate your availability.</p>
        <div className="legend">
          <div className="calendar-dropdown">
            <p className="label">Overlay My Calendars</p>
            <DropdownMultiple
              key={props.inputDisabled}
              name="calendars"
              title={"None Selected"}
              titleSingular={"Selected"}
              titlePlural={"Selected"}
              list={findCalendarLabels()}
              disabled={props.inputDisabled}
              size="dd-wrapper-large"
              enableScroll="dd-no-scroll"
              checkIcon={
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNSAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNNS42IDExLjNMMC41IDZMMi41IDQuMUw1LjYgNy40TDEzIDBMMTUgMkw1LjYgMTEuM1oiIGZpbGw9ImJsYWNrIi8+DQo8L3N2Zz4=" />
              }
              onChange={onCalendarChange}
            />
          </div>
          <div className="unavailable-left"></div>
          <div className="unavailable-right"></div>
          <p className="label">Unavailable</p>
          <div className="available"></div>
          <p className="label">Available</p>
        </div>
      </div>
      <div className="labels-and-slots">
        {props.days != undefined ? (
          (() => {
            let day_slots_list = [];
            let cur_group = -1;
            for (let i = 0; i < props.days.length; i++) {
              let unavailable_hours = [];
              for (let j = 0; j < selectedCalendars.length; j++) {
                unavailable_hours.push(selectedCalendars[j]);
              }
              let day = props.days[i];
              if (day.group != cur_group) {
                cur_group = day.group;
                day_slots_list.push(
                  <div className="hour-labels">{getHourLabels()}</div>
                );
              }
              day_slots_list.push(
                <div key={day.id} className="day-slots-container">
                  <DaySlots
                    viewingGroup={props.viewingrGroup}
                    id={day.id}
                    days={props.days}
                    setDays={props.setDays}
                    numResponses={props.numResponses}
                    selectedCalendars={selectedCalendars}
                    inputDisabled={props.inputDisabled}
                    setUnsavedChanges={setUnsavedChanges}
                    setResponded={props.setResponded}
                  />
                </div>
              );
            }
            return day_slots_list;
          })()
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="submit-container">
        <p
          className="label italic"
          style={unsavedChanges == "none" ? { display: "none" } : {}}
        >
          {unsavedChanges == "true" ? "Unsaved changes." : "Availabilities sent!"}
        </p>
        <button
          className={props.inputDisabled || unsavedChanges == "false" ? "disabled-button" : "solid-button"}
          disabled={props.inputDisabled}
          onClick={handleSendAvailability}
        >
          Send Availability
        </button>
      </div>
    </div>
  );
}

export default InputCalendar;
