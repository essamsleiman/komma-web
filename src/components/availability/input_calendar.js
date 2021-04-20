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

    const [selectedCalendars, setSelectedCalendars] = useState([]); 

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
        setSelectedCalendars(newSelectedCalendars); 
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

    // Update the internal availabilities object to be sent back to the DB 
    function sendAvailabilities() { 
        let new_days = props.days 

        for (let day = 0; day < new_days.length; day++) { 
            for (let block = 0; block < new_days[day].times.length; block++) { 
                let old_attendance_num = new_days[day].times[block][1] 
                let can_attend = parseInt(old_attendance_num.substring(0, old_attendance_num.indexOf(','))) 
                let total_responses = parseInt(old_attendance_num.substring(old_attendance_num.indexOf(',') + 1)) 
                total_responses++; 
                if (new_days[day].times[block][2]) { // can attend this time block 
                    new_days[day].times[block][1] = ++can_attend + '/' + total_responses 
                } 
                else { // cannot attend this time block 
                    new_days[day].times[block][1] = can_attend + '/' + total_responses 
                }
            }
        }
        
        console.log(new_days) 
        props.setDays(JSON.parse(JSON.stringify(new_days))) 
    }

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
                            checkIcon={<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNSAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNNS42IDExLjNMMC41IDZMMi41IDQuMUw1LjYgNy40TDEzIDBMMTUgMkw1LjYgMTEuM1oiIGZpbGw9ImJsYWNrIi8+DQo8L3N2Zz4=" />} 
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
                                        viewingGroup={props.viewingrGroup} 
                                        id={day.id} 
                                        days={props.days}
                                        setDays={props.setDays} 
                                        numResponses={props.numResponses}
                                        selectedCalendars={selectedCalendars} 
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
                    onClick={sendAvailabilities} 
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