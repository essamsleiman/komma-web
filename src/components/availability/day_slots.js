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

import react, { useState } from 'react'; 
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
        let day = date_split[1];
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

    function getNextHalfHour(time) {
        // Check second to last interval to calculate
        // lastHour is the start time of the last interval (ex "10am")
        let lastHalfHour = time.slice(0, -2);
        let period = time.slice(-2);
        let nextHalfHour = 0;
        if (parseInt(lastHalfHour) < 100) // If it's on the hour
            nextHalfHour = (lastHalfHour * 100) + 30;
        else { // If it's on the half hour
            nextHalfHour = parseInt(lastHalfHour.slice(0, 2)) % 12 + 1;
            if (nextHalfHour == 12) {
                if (period == "am")
                    period = "pm";
                else
                    period = "am";
            }
        }
        return (nextHalfHour + " " + period);
    }

    //
    // Functions below apply to input calendar only
    //
    function adjustAttendance(line_number) { 
        if (props.inputDisabled)
            return;
        if (props.viewingGroup)
            return;
        
        let new_days = props.days 
        let old_attendance_num = new_days[props.id].times[line_number][1] 
        let can_attend = parseInt(old_attendance_num.substring(0, old_attendance_num.indexOf(','))) 
        let total_responses = parseInt(old_attendance_num.substring(old_attendance_num.indexOf(',') + 1)) 
        if (props.numResponses == total_responses) { 
            new_days[props.id].times[line_number][2] = true 
        } 
        else if (new_days[props.id].times[line_number][2] == true) { 
            new_days[props.id].times[line_number][2] = false  
        } 
        else {
            new_days[props.id].times[line_number][2] = true 
        }
        console.log(new_days) 
        props.setDays(JSON.parse(JSON.stringify(new_days))) 
        props.setUnsavedChanges("true"); 
    } 

    function checkIfMouseEntered(e, line_number) { 
        if (e.buttons == 1) {
            console.log("mouse has been clicked down");
            adjustAttendance(line_number); 
        }
    }

    function isNotAvailable(day, time_block) { 
        for (let i = 0; i < props.selectedCalendars.length; i++) { // each calendar 
            if (props.selectedCalendars[i][day][time_block][1]) 
                return true 
        } 
        return false 
    } 

    //
    // Functions below apply to group calendar only
    //
    function displayBlockAvailability(attendance_nums, id, line_number) { 
        if (!props.viewingGroup) 
            return;
        document.getElementById("block-id" + id + "-line" + line_number).style.display = "block"; 
    } 
    
    function stopDisplayBlockAvailability(id, line_number) { 
        if (!props.viewingGroup) 
            return;
        document.getElementById("block-id" + id + "-line" + line_number).style.display = "none"; 
    }

    function getFracUnavailable(frac_available) {
        let available = parseInt(frac_available.split("/")[0]);
        let total = parseInt(frac_available.split("/")[1]);
        return ((total - available) + "/" + total);
    }

    function calculateGroupAvailability(attendance_nums) { 
        let num_can_attend = parseInt(attendance_nums.substring(0, 1)) 
        let num_responses = parseInt(attendance_nums.substring(2)) 
        return "rgba(71, 203, 108, " + num_can_attend / (num_responses - 1) + ")" 
    }
    
    return (
        <div className={"day-container" + (props.inputDisabled ? " disabled" : "")}> 
            <p className="label date" id="test">{getFormattedDate(props.days[props.id].date)}</p>
            <p className="day-of-week">{getDayOfWeek(props.days[props.id].date)}</p>
            { 
                props.days[props.id].times.map((times, line_number) => (
                    <div>
                        <div 
                            className="time-block" 
                            onMouseOver={() => displayBlockAvailability(props.days[props.id].times[line_number][1], props.id, line_number)} 
                            onMouseLeave={() => stopDisplayBlockAvailability(props.id, line_number)} 
                            onMouseDown={() => adjustAttendance(line_number)} 
                            onMouseEnter={(event) => checkIfMouseEntered(event, line_number)} 
                            style={{ backgroundColor: (() => {
                                        if (!props.viewingGroup && props.inputDisabled) 
                                            return "var(--verylightgray)"; 
                                        else if (props.viewingGroup) { 
                                            return calculateGroupAvailability(props.days[props.id].times[line_number][1]); 
                                        } 
                                        else if (props.days[props.id].times[line_number][2]) 
                                            return "var(--kommagreen)"; 
                                        else if (!props.viewingGroup && isNotAvailable(props.id, line_number)) 
                                            return "var(--lightred)"; 
                                        else 
                                            return "var(--kommawhite)"; 
                                     })(), 
                                     borderBottom: (() => {
                                        if (props.days[props.id].times[line_number][2])
                                            return "";
                                        else if (line_number % 2 == 0)
                                            return "dotted 1px var(--lightgray)";
                                        else
                                            return "solid 1px var(--lightgray)";
                                     })(),
                                     borderTop: line_number == 0 ? "solid 1px var(--lightgray)" : "",
                                     borderLeft:  props.days[props.id].first ? "solid 1px var(--lightgray)" : "" }}
                        ></div>
                        { props.viewingGroup ?
                            <div 
                                id={"block-id" + props.id + "-line" + line_number} 
                                className="block-availability"
                                style={{display: "none"}}
                            >
                                <div className="triangle"></div>
                                <p className="label bold header">
                                    {
                                        getDayOfWeek(props.days[props.id].date) + ", "
                                        + getFormattedDate(props.days[props.id].date) + " from "
                                        + props.days[props.id].times[line_number][0] + " - "
                                        + getNextHalfHour(props.days[props.id].times[line_number][0])
                                    }
                                </p>
                                <div className="row no-gutters">
                                    <div className="col-6">
                                        <p className="label bold frac-people">
                                            {props.days[props.id].times[line_number][1] + " Available"}
                                        </p>
                                        {
                                            props.intervals[line_number][3].map((name) => (
                                                <p className="label">{name}</p>
                                            ))
                                        }
                                    </div>
                                    <div className="col-6">
                                        <p className="label bold frac-people">
                                            {getFracUnavailable(props.days[props.id].times[line_number][1]) + " Unavailable"}
                                        </p>
                                        {
                                            props.intervals[line_number][4].map((name) => (
                                                <p className="label">{name}</p>
                                            ))
                                        }
                                    </div>
                                </div>
    
                            </div>
                            : ""
                        }
                    </div>
                )) 
            } 
        </div> 
    );
}

export default TimeSlots; 