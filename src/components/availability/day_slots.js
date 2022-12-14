/*
This file contains the vertical time blocks for a particular day. 
To access the start of said time block, use: 
props.days[props.id].times[line_number][0], denoted in half hour intervals 
To access the number of people who can attend/number of people who have responded, use: 
props.days[props.id].times[line_number][1] 
To access whether or not the person can attend for a particular day, use: 
props.days[props.id].times[line_number][2], which defaults to false on load 
Note that props.id directly grabs the date's id, which is also it's index in the array of days 
*/

import react, { useState } from "react";
import "../css/day_slots.css";
//import HourSlots from "./hour_slots";

function TimeSlots(props) {
  function getDayOfWeek(date) {
    let date_split = date.split("/");
    let the_date = new Date(date_split[2], date_split[0] - 1, date_split[1]);
    switch (the_date.getDay()) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  }
  function getFormattedDate(date) {
    let date_split = date.split("/");
    let month = date_split[0];
    let day = parseInt(date_split[1]);
    switch (parseInt(month)) {
      case 1:
        return "Jan " + day;
      case 2:
        return "Feb " + day;
      case 3:
        return "Mar " + day;
      case 4:
        return "Apr " + day;
      case 5:
        return "May " + day;
      case 6:
        return "Jun " + day;
      case 7:
        return "Jul " + day;
      case 8:
        return "Aug " + day;
      case 9:
        return "Sep " + day;
      case 10:
        return "Oct " + day;
      case 11:
        return "Nov " + day;
      case 12:
        return "Dec " + day;
    }
  }

  //
  // Functions below apply to input calendar only
  //
  function adjustAttendance(line_number) {
    if (props.inputDisabled) return;
    if (props.viewingGroup) return;

    props.setResponded(true);

    let new_days = props.days;

    // first, increment all group responses by 1 if this is the person's first response
    let adjusted_responses = false;
    for (let day = 0; day < new_days.length && !adjusted_responses; day++) {
      for (let block = 0; block < new_days[day].times.length && !adjusted_responses; block++) {
        let can_attend = new_days[day].times[block][1];
        let total_responses = new_days[day].times[block][2];
        // check if respondents availabilities have already been calculated for
        if (total_responses > props.numResponses) {
          adjusted_responses = true;
          break;
        }
        new_days[day].times[block][1] = can_attend;
        new_days[day].times[block][2] = ++total_responses;
      }
    }

    // update the actual rectangle that the user just clicked on
    let can_attend = new_days[props.id].times[line_number][1];
    let total_responses = new_days[props.id].times[line_number][2];
    if (new_days[props.id].times[line_number][3]) {
      // previously marked attending
      new_days[props.id].times[line_number][1] = --can_attend;
      new_days[props.id].times[line_number][2] = total_responses;
      new_days[props.id].times[line_number][3] = false;
      // update the red calendar import block testing state 
      let is_red = false; 
      for (let i = 0; i < props.selectedCalendars.length; i++) {
        if (props.selectedCalendars[i][props.id][line_number][1])
          is_red = true;
      }
      new_days[props.id].times[line_number][6] = is_red ? 2 : 0; 
    } else {
      // have not yet marked attending
      new_days[props.id].times[line_number][1] = ++can_attend;
      new_days[props.id].times[line_number][2] = total_responses;
      new_days[props.id].times[line_number][3] = true;
      if (new_days[props.id].times[line_number][6] == 2) 
        new_days[props.id].times[line_number][6] = 1;
      else
        new_days[props.id].times[line_number][6] = 3; // update the red calendar import block testing state 
    }
    console.log(new_days);

    props.setDays(JSON.parse(JSON.stringify(new_days)));
    props.setUnsavedChanges("true");
  }

  function checkIfMouseEntered(e, line_number) {
    if (e.buttons == 1) {
      adjustAttendance(line_number);
    }
  }

  function isNotAvailable(day, time_block) {
    let not_available_status = false;
    for (let i = 0; i < props.selectedCalendars.length; i++) {
      // each calendar
      try {
        if (props.selectedCalendars[i][day][time_block][1])
          not_available_status = true;
      } catch {
        console.log("hit props error", props, i);
      }
    }
    // if they are not available, then update the overall group availability numbers
    if (not_available_status) {
      let new_days = props.days;

      // first, increment all group responses by 1 if this is the person's first response
      let adjusted_responses = false;
      for (let day = 0; day < new_days.length && !adjusted_responses; day++) {
        for (
          let block = 0;
          block < new_days[day].times.length && !adjusted_responses;
          block++
        ) {
          let can_attend = new_days[day].times[block][1];
          let total_responses = new_days[day].times[block][2];
          // check if respondents availabilities have already been calculated for
          if (total_responses > props.numResponses) {
            adjusted_responses = true;
            break;
          }
          new_days[day].times[block][1] = can_attend;
          new_days[day].times[block][2] = ++total_responses;
        }
      }

      // add this person's unavailability for this particular rectangle
      let can_attend = new_days[day].times[time_block][1];
      let total_responses = new_days[day].times[time_block][2];
      if (new_days[day].times[time_block][3]) can_attend--;
      new_days[day].times[time_block][1] = can_attend;
      new_days[day].times[time_block][2] = total_responses;
      new_days[day].times[time_block][3] = false;
      new_days[day].times[time_block][6] = 2;
      props.setDays(new_days);
    }

    return not_available_status;
  }

  //
  // Functions below apply to group calendar only
  //
  function displayBlockAvailability(attendance_nums, id, line_number) {
    if (!props.viewingGroup) return;
    document.getElementById(
      "block-id" + id + "-line" + line_number
    ).style.display = "block";
  }

  function stopDisplayBlockAvailability(id, line_number) {
    if (!props.viewingGroup) return;
    document.getElementById(
      "block-id" + id + "-line" + line_number
    ).style.display = "none";
  }

  function calculateGroupAvailability(num_can_attend, num_responses) {
    return "rgba(71, 203, 108, " + num_can_attend / (num_responses) + ")";
  }

  // Converts 24hr time string to 12hr (ex. 14:00 -> 2:00 pm)
  function to12HourTime(time) {
    let hour = parseInt(time.split(":")[0]);
    let minutes = time.split(":")[1];
    let twelveHour = ((hour + 11) % 12) + 1;
    let period = hour >= 12 ? "pm" : "am";
    return twelveHour + ":" + minutes + " " + period;
  }

  // ** This function will only be used if we decide to store start times **
  function getNextHalfHour(time) {
    // prevHour in 24 hour time
    let prevHour = parseInt(time.slice(0, -2));
    let prevMinutes = parseInt(time.slice(-2));
    // nextHour in 12 hour time
    let nextHour = prevMinutes == 0 ? ((prevHour + 11) % 12) + 1 : ((prevHour + 1 + 11) % 12) + 1;
    let nextMinutes = prevMinutes == 0 ? "30" : "00";
    let period = (prevHour >= 12 || (prevHour == 11 && prevMinutes == 30)) ? "pm" : "am";
    return nextHour + ":" + nextMinutes + " " + period;
  }

  function getPrevHalfHour(time) {
    // nextHour in 24 hour time
    let nextHour = parseInt(time.slice(0, -2));
    let nextMinutes = parseInt(time.slice(-2));
    // prevHour in 12 hour time
    let prevHour = nextMinutes == 0 ? ((nextHour - 1 + 11) % 12) + 1 : ((nextHour + 11) % 12) + 1;
    let prevMinutes = nextMinutes == 0 ? "30" : "00";
    let period = ((nextHour <= 11) || (prevHour == 11 && prevMinutes == 30))? "am" : "pm";
    return prevHour + ":" + prevMinutes + " " + period;
  }

  return (
    <div className={"day-container" + (props.inputDisabled ? " disabled" : "")}>
      <p className="label date" id="test">
        {getFormattedDate(props.days[props.id].date)}
      </p>
      <p className="day-of-week">{getDayOfWeek(props.days[props.id].date)}</p>
      {props.days[props.id].times.map((times, line_number) => (
        <div>
          <div
            className="time-block"
            onMouseOver={() =>
              displayBlockAvailability(
                props.days[props.id].times[line_number][1],
                props.id,
                line_number
              )
            }
            onMouseLeave={() =>
              stopDisplayBlockAvailability(props.id, line_number)
            }
            onMouseDown={() => adjustAttendance(line_number)}
            onMouseEnter={(event) => checkIfMouseEntered(event, line_number)}
            style={{
              backgroundColor: (() => {
                if (!props.viewingGroup && props.inputDisabled)
                  return "var(--verylightgray)";
                else if (props.viewingGroup){
                  return calculateGroupAvailability(
                    props.days[props.id].times[line_number][1],
                    props.days[props.id].times[line_number][2]
                  );
                } else if (
                  !props.viewingGroup &&
                  props.days[props.id].times[line_number][6] != 1 && 
                  isNotAvailable(props.id, line_number)
                )
                  return "var(--lightred)";
                else if (props.days[props.id].times[line_number][3])
                  return "var(--kommagreen)";
                else return "var(--kommawhite)";
              })(),
              borderBottom: (() => {
                if (
                    (props.days[props.id].times[line_number][3] ||
                    (props.viewingGroup && props.days[props.id].times[line_number][1] != 0)
                   ) && line_number != props.days[props.id].times.length - 1)
                  return "";
                else if (line_number % 2 == 0)
                  return "dotted 1px var(--lightgray)";
                else return "solid 1px var(--lightgray)";
              })(),
              borderTop: line_number == 0 ? "solid 1px var(--lightgray)" : "",
              borderLeft: props.id == 0 ? "solid 1px var(--lightgray)" : "", // Only works for one group, needs to be changed to check "first" attribute
            }}
          ></div>
          {props.viewingGroup ? (
            <div
              id={"block-id" + props.id + "-line" + line_number}
              className="block-availability"
              style={{ display: "none" }}
            >
              <div className="triangle"></div>
              <p className="label bold header">
                {getDayOfWeek(props.days[props.id].date) + ", " 
                 + getFormattedDate(props.days[props.id].date) + " from " 
                 + getPrevHalfHour(props.days[props.id].times[line_number][0]) + " - " 
                 + to12HourTime(props.days[props.id].times[line_number][0])}
              </p>
              <div className="row no-gutters">
                <div className="col-6">
                  <p className="label bold frac-people">
                    {props.days[props.id].times[line_number][1] + "/" +
                      props.days[props.id].times[line_number][2] + " Available"}
                  </p>
                  {props.days[props.id].times[line_number][4].map((name) => (
                    <p className="label">{name}</p>
                  ))}
                  {props.days[props.id].times[line_number][3] && <p className="label">{props.name}</p>} {/* Current user's name */}
                </div>
                <div className="col-6">
                  <p className="label bold frac-people">
                    {props.days[props.id].times[line_number][2] -
                      props.days[props.id].times[line_number][1] + "/" +
                      props.days[props.id].times[line_number][2] + " Unavailable"}
                  </p>
                  {props.days[props.id].times[line_number][5].map((name) => (
                    <p className="label">{name}</p>
                  ))}
                  {(!props.days[props.id].times[line_number][3] && props.responded) && <p className="label">{props.name}</p>} {/* Current user's name */}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default TimeSlots;
