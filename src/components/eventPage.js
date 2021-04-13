import React from "react";

function eventPage(props) {
    console.log("hit", props.match.params.eventId);

    //  make axios call pass props.match.params.eventId



    return (
        <div>
            <p>
                eventpage
            </p>
        </div>
    )
}

export default eventPage;