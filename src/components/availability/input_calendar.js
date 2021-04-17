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
import DropdownMultiple from "../dropdown_multiple"; 
import DaySlots from "./day_slots";  

function InputCalendar(props) { 

    let selectedCalendars = [] 

    function findCalendarLabels() { 
        if (props.calendars == undefined) 
            return 
        else { 
            return props.calendars.map(function(calendar) { return { label: calendar['calendarLabel'], value: calendar['id'] } }); 
        } 
    } 

    function onCalendarChange(item, name) { 
        let newSelectedCalendars = []; 
        for (let i = 0; i < item.length; i++) { 
            newSelectedCalendars.push(props.calendars[item[i].value].times); 
        } 
        selectedCalendars = newSelectedCalendars; 
        console.log(selectedCalendars); 
    } 

    function adjustIntervals() { 
        let new_days = props.days 
        new_days[0].times[2][1] = '5/6' 
        console.log(new_days) 
        props.setDays(JSON.parse(JSON.stringify(new_days))) 
    }

    function getHourLabels() {
        let label_list = [];
        props.intervals.map((interval) => { 
            // The times of the intervals on the hour have two digits, so are < 100
            if (parseInt(interval[0]) < 100) {
                label_list.push(<p className="label">{parseInt(interval[0]) + " " + interval[0].slice(-2)}</p>);
            }
        })
        label_list.push(getNextHour());
        return label_list;
    }

    function getNextHour() {
        // Check second to last interval to calculate
        // lastHour is the start time of the last interval (ex "10am")
        let lastHour = props.intervals.slice(-2)[0][0];
        let nextHour = parseInt(lastHour) % 12 + 1;
        let period = lastHour.slice(-2);
        if (nextHour == 12) {
            if (period == "am")
                period = "pm";
            else
                period = "am";
        }
        return (<p className="label">{nextHour + " " + period}</p>);
    }

    console.log(props.days) 
    console.log(props.days.length) 

    return (
        <div className={"input-cal-container top-content-container vertical-spacing" + (props.inputDisabled ? " disabled" : "")}>
            <div className="header">
                <p>Click and drag to indicate your availability.</p>
                <div className="legend">
                    <div className="calendar-dropdown"> 
                        <p className="label">Overlay My Calendars</p>
                        <DropdownMultiple
                            key={props.inputDisabled}
                            name="calendars"
                            title={'None Selected'} 
                            titleSingular={'Selected'}
                            titlePlural={'Selected'}  
                            list={findCalendarLabels()}
                            disabled={props.inputDisabled}
                            size="dd-wrapper-large"
                            enableScroll="dd-no-scroll"
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
                {
                    props.days != undefined ? (() => {
                        let day_slots_list = [];
                        let cur_group = -1;
                        for (let i = 0; i < props.days.length; i++) { 
                            let unavailable_hours = [] 
                            for (let j = 0; j < selectedCalendars.length; j++) { 
                                unavailable_hours.push(selectedCalendars[j]); 
                            }
                            let day = props.days[i];
                            if (day.group != cur_group) {
                                cur_group = day.group;
                                day_slots_list.push(
                                    <div className="hour-labels">
                                        {getHourLabels()}
                                    </div>
                                );
                            }
                            day_slots_list.push(
                                <div key={day.id} className="day-slots-container">
                                    <DaySlots 
                                        id={day.id} 
                                        days={props.days}
                                        setDays={props.setDays} 
                                        numResponses={props.numResponses}
                                        unavailableHours={unavailable_hours} 
                                        inputDisabled={props.inputDisabled}
                                    /> 
                                </div> 
                            );
                        }
                        return day_slots_list;
                    })() : ( 
                        <p>Loading...</p>
                    )
                } 
            </div>
            <div className="submit-container">
                <button 
                    className={props.inputDisabled ? "disabled-button" : "solid-button"}
                    disabled={props.inputDisabled}
                >
                    Send Availability
                </button>
            </div>
        </div>
    );
}

export default InputCalendar; 

// props.days.map((day) => ( 
//     <div key={day.id} className="day-slots-container">
//         <DaySlots 
//             id={day.id} 
//             days={props.days}
//             setDays={props.setDays} 
//             numResponses={props.numResponses} 
//         /> 
//     </div> 