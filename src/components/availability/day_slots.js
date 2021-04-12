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
import HourSlots from "./hour_slots";  

function TimeSlots(props) { 

    function adjustAttendance(line_number) { 
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

    return (
        <div> 
            <p>Day number: {props.id} </p>
            { 
                props.days[props.id].times.map((times, line_number) => (
                    <p onClick={() => adjustAttendance(line_number)}>{times}</p>
                )) 
            } 
        </div> 
    );
}

export default TimeSlots; 