/* 

This file contains all of the day's and their individual time blocks. 
It exists to serve as a wrapper over them for global CSS styles, more dynamic loading, 
and clean code. 

The placement of the hour blocks on the left hand side will also exist here. 
To get the text of the time to load, iterate over: 
props.intervals[i][0], where i is the current iteration of the loop and 
0 is the first element, the block's starting time represented in text form. 

*/ 

import react, { useState } from 'react';
import "../css/input_calendar.css";
import DaySlots from "./day_slots";  

function InputCalendar(props) {

    function adjustIntervals() { 
        let new_days = props.days 
        new_days[0].times[2][1] = '5/6' 
        console.log(new_days) 
        props.setDays(JSON.parse(JSON.stringify(new_days))) 
    }

    console.log(props.days) 
    console.log(props.days.length) 

    return (
        <div className="top-content-container vertical-spacing">
            {
                props.days != undefined ? ( 
                    props.days.map((day) => ( 
                        <div key={day.id} className="day-slots-container">
                            <DaySlots 
                                id={day.id} 
                                days={props.days}
                                setDays={props.setDays} 
                                numResponses={props.numResponses} 
                            /> 
                        </div> 
                        // Old raw information display method 
                        // <div key={day.id}>
                        //     <h3>{day.date}</h3>
                        //     <p>{day.times}</p>
                        // </div>
                    ))
                ) : ( 
                    <p>Loading...</p>
                )
            } 
        </div>
    );
}

export default InputCalendar; 