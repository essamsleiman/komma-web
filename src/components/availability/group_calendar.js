import react, { useState } from 'react';
import "../css/group_calendar.css";
import DaySlots from "./day_slots";  

function GroupCalendar(props) {
    function getGroupLegend() {
        let block_list = [];
        block_list.push(
            <p className="label group-legend-label">{0 + "/" + props.numResponses + " Available"}</p>
        )
        for (let i = 0; i < props.numResponses; i++) {
            block_list.push(
                <div
                    className={
                        (() => {
                            if (i == 0)
                                return "legend-block first-block";
                            else if (i == props.numResponses - 1)
                                return "legend-block last-block";
                            else
                                return "legend-block";
                        })()
                    }
                    style={{
                        backgroundColor: "rgba(71, 203, 108, " + i / (props.numResponses - 1) + ")",
                    }}
                ></div>
            )
        }
        block_list.push(
            <p className="label group-legend-label">{props.numResponses + "/" + props.numResponses + " Available"}</p>
        )
        return block_list;
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

    console.log(props); 

    return (
        <div className={"input-cal-container top-content-container vertical-spacing" + (props.inputDisabled ? " disabled" : "")}>
            <div className="header">
                <p>Hover to view the group’s availability at different times.</p>
                <div className="legend">
                    {getGroupLegend()}
                </div>
            </div>
            <div className="labels-and-slots">
                {
                    props.days != undefined ? (() => {
                        let day_slots_list = [];
                        let cur_group = -1;
                        for (let i = 0; i < props.days.length; i++) {
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
                                        viewingGroup={props.viewingGroup} 
                                        id={day.id} 
                                        days={props.days}
                                        setDays={props.setDays} 
                                        numResponses={props.numResponses} 
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
        </div>
    );
}

export default GroupCalendar; 