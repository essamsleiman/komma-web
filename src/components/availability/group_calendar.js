import react, { useState } from "react";
import "../css/input_calendar.css";
import "../css/group_calendar.css";
import DaySlots from "./day_slots";

function GroupCalendar(props) {
  function getGroupLegend() {
    let block_list = [];
    let num_responses = props.days[0].times[0][2]; // Number responses, included current user
    block_list.push(
      <p className="label group-legend-label">
        {0 + "/" + num_responses + " Available"}
      </p>
    );
    for (let i = 0; i < num_responses + 1; i++) {
      block_list.push(
        <div
          className={(() => {
            if (i == 0) return "legend-block first-block";
            else if (i == num_responses) return "legend-block last-block";
            else return "legend-block";
          })()}
          style={{
            backgroundColor:
              "rgba(71, 203, 108, " + i / num_responses + ")",
          }}
        ></div>
      );
    }
    block_list.push(
      <p className="label group-legend-label">
        {num_responses + "/" + num_responses + " Available"}
      </p>
    );
    return block_list;
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

  return (
    <div className="input-cal-container top-content-container vertical-spacing">
      <div className="header">
        <p>Hover to view the group’s availability at different times.</p>
        <div className="legend">{getGroupLegend()}</div>
      </div>
      <div className="labels-and-slots">
        {props.days != undefined ? (
          (() => {
            let day_slots_list = [];
            let cur_group = -1;
            for (let i = 0; i < props.days.length; i++) {
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
                    viewingGroup={props.viewingGroup}
                    id={day.id}
                    days={props.days}
                    setDays={props.setDays}
                    numResponses={props.numResponses}
                    intervals={props.intervals}
                    name={props.name}
                    responded={props.responded}
                  />
                </div>
              );
            }
            return day_slots_list;
          })()
        ) : (
          <div class="spinner-border text-primary" role="status" style={{marginLeft: "25px"}}>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupCalendar;
