import react, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LeftBar from "./availability/left_bar"
import TopBar from "./availability/top_bar"
import "./css/availability.css";
import InputCalendar from './availability/input_calendar';

function Availability() {
  const [viewingGroup, setViewingGroup] = useState(false);
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
  const intervals = [
    ['9am', '0/5', false],
    ['930am', '2/5', false],
    ['10am', '4/5', false],
    ['1030am', '5/5', false],
    ['11am', '4/5', false],
    ['1130am', '1/5', false],
  ] 
  // must use JSON.parse(JSON.stringify(intervals)) to create unique multi-dimensional array copies 
  const [days, setDays] = useState([
    {id: 0, date: '4/12', times: JSON.parse(JSON.stringify(intervals))}, 
    {id: 1, date: '4/13', times: JSON.parse(JSON.stringify(intervals))}, 
  ]) 
  const numResponses = 5

  // useEffect(() => { 
  //   console.log(intervals); 
  //   if (intervals != undefined) { 
  //     let old = days; 
  //     old.push({id: 1, day: '4/12', times: intervals}) 
  //     old.push({id: 2, day: '4/13', times: intervals}) 
  //     old.push({id: 3, day: '4/14', times: intervals}) 
  //     this method doesn't work for multi-dimensional arrays, which is why day[0] or day[1] never worked as keys 
  //     setDays([...old]) 
  //   }
  // }, [intervals]) 

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
                  meetingHostName={'Omid'}  
                />
                <InputCalendar
                  intervals={intervals} 
                  days={days} 
                  setDays={setDays} 
                  numResponses={numResponses} 
                /> 
            </div>
        </div>
    </div>
  );
}

export default Availability;