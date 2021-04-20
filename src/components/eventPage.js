import React, { useState, useEffect } from "react";
import axios from "axios";

function EventPage(props) {
    console.log("hit", props.match.params.eventId);

    const eventID = props.match.params.eventId;

    var eventInfo;
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        // axios call to get the data:
        axios.get(`http://localhost:5000/events/get/${eventID}`).then((response) => {
            if (response) {
                console.log("hit response in eventPage", response);
                eventInfo = response.data;
                setEventData(response.data);
            } else {
                console.log("hit error in eventPage axios call");
            }
        });
        // alert("axios call finished");
    }, [])

    console.log("hit eventinfo", eventInfo)
    if (eventData) {
        return (
            <div>
                <p>
                    eventpage
                </p>
                <p>
                    Host: {eventData.hostName}
                </p>
                <p>
                    Host's ID: {eventData.hostID}
                </p>
                <p>
                    Event Location: {eventData.location}
                </p>
                <p>
                    Event Link: www.komma.com/events/{eventData._id}
                </p>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default EventPage;