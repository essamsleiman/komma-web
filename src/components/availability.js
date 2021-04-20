import react, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LeftBar from "./availability/left_bar"
import TopBar from "./availability/top_bar"
import "./css/availability.css";
import InputCalendar from './availability/input_calendar';
import GroupCalendar from './availability/group_calendar';

// import testing data 
import { intervals, calendar1_intervals, calendar2_intervals, calendar3_intervals } from "./test_data"; 

function Availability() {
  const [viewingGroup, setViewingGroup] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [userInfo, setUserInfo] = useState(
    {
      signedIn: false,
      name: '',
      email: '',
      googleName: 'Edward Chew',
      googleEmail: 'edward@email.com',
    }
  )

  /* 

    These variables exist to server input_calendar.js. 
    intervals: [the time range's start point, num marked attending/num responded so far, 
                current user can attend] 
    days: [{id, date, a copy of intervals showing availability for that specific day}]
    
  */ 
  // must use JSON.parse(JSON.stringify(intervals)) to create unique multi-dimensional array copies 
  const [days, setDays] = useState([
    {id: 0, date: '4/12/2021', group: 0, first: true, times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 1, date: '4/13/2021', group: 0, first: false, times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 2, date: '4/22/2021', group: 1, first: true, times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 3, date: '4/23/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 4, date: '4/24/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 5, date: '4/25/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 6, date: '4/26/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 7, date: '4/27/2021', group: 1, first: false, times: JSON.parse(JSON.stringify(intervals))}, 
  ]) 
  const calendars = [
    {id: 0, calendarLabel: 'Personal Calendar', times: calendar1_intervals}, 
    {id: 1, calendarLabel: 'UCD Calendar', times: calendar2_intervals}, 
    {id: 2, calendarLabel: 'Komma Calendar', times: calendar3_intervals}, 
  ] 
  const numResponses = 5

  return (
    <div>
        <div className="row no-gutters justify-content-center shadow-card top-margin">
            <div className="col-3">
                <LeftBar viewingGroup={viewingGroup} setViewingGroup={setViewingGroup} />
            </div>
            <div className="col-9">
                <div className="vertical-bar"></div>
                <TopBar 
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  setInputDisabled={setInputDisabled}
                  meetingHostName={'Omid'}  
                />
                { !viewingGroup ? 
                  (
                    <InputCalendar
                      viewingGroup={viewingGroup} 
                      intervals={intervals} 
                      days={days} 
                      setDays={setDays} 
                      inputDisabled={inputDisabled}
                      numResponses={numResponses} 
                      calendars={calendars}
                    /> 
                  ) : ( 
                    <GroupCalendar
                      viewingGroup={viewingGroup} 
                      intervals={intervals} 
                      days={days} 
                      setDays={setDays} 
                      inputDisabled={inputDisabled}
                      numResponses={numResponses} 
                    /> 
                  )
                }
            </div>
        </div>
    </div>
  );
}

export default Availability;