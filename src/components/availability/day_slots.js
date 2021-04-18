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
    function adjustAttendance(line_number) { 
        if (props.inputDisabled)
            return;
        
        let new_days = props.days 
        let old_attendance_num = new_days[props.id].times[line_number][1] 
        let can_attend = parseInt(old_attendance_num.substring(0, 1)) 
        let total_responses = parseInt(old_attendance_num.substring(2)) 
        if (props.numResponses == total_responses) { 
            can_attend += 1 
            new_days[props.id].times[line_number][1] = can_attend + '/' + (total_responses + 1)
            new_days[props.id].times[line_number][2] = true 
        } 
        else if (new_days[props.id].times[line_number][2] == true) { 
            new_days[props.id].times[line_number][1] = (can_attend - 1) + '/' + (total_responses)
            new_days[props.id].times[line_number][2] = false  
        } 
        else {
            new_days[props.id].times[line_number][1] = (can_attend + 1) + '/' + (total_responses)
            new_days[props.id].times[line_number][2] = true 
        }
        console.log(new_days) 
        props.setDays(JSON.parse(JSON.stringify(new_days))) 
    } 

    function checkIfMouseEntered(e, line_number) { 
        if (e.buttons == 1) {
            console.log("mouse has been clicked down");
            adjustAttendance(line_number); 
        }
    }

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

    function isNotAvailable(day, time_block) { 
        for (let i = 0; i < props.selectedCalendars.length; i++) { // each calendar 
            if (props.selectedCalendars[i][day][time_block][1]) 
                return true 
        }
        return false 
    } 
    
    return (
        <div className={"day-container" + (props.inputDisabled ? " disabled" : "")}> 
            <p className="label date">{getFormattedDate(props.days[props.id].date)}</p>
            <p className="day-of-week">{getDayOfWeek(props.days[props.id].date)}</p>
            { 
                props.days[props.id].times.map((times, line_number) => (
                    <div>
                        <div 
                            className="time-block" 
                            onMouseDown={() => adjustAttendance(line_number)} 
                            onMouseEnter={(event) => checkIfMouseEntered(event, line_number)} 
                            style={{ backgroundColor: (() => {
                                        if (props.inputDisabled)
                                            return "var(--verylightgray)";
                                        else if (props.days[props.id].times[line_number][2])
                                            return "var(--kommagreen)";
                                        else if (isNotAvailable(props.id, line_number)) 
                                            return "var(--kommared)"; 
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
                    </div>

                )) 
            } 
        </div> 
    );
}

export default TimeSlots; 