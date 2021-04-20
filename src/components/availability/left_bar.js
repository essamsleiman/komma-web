import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/left_bar.css";
import copy_icon from "../../img/copy_icon.svg"

function LeftBar(props) {
    var data = {
        name: "Komma Weekly Standup Meeting",
        meetingDuration: "60",
        meetingDurationUnits: "minutes",
        location: "google",
        address: "1234 Nowhere Rd. City, CA 12345",
    }
    var name = data.name;
    var meetingDuration = data.meetingDuration;
    var meetingDurationUnits = data.meetingDurationUnits;
    var location = data.location;
    var address = data.address;

    var respondents = ["Edward Chew", "James Junaidi", "Omid Mogasemi", "Essam Sleiman"];
    var inviteLink = "komma.com/my-meeting";
    var isHost = true;

    const [linkFieldContent, setLinkFieldContent] = useState(inviteLink);

    function changeViewButton() {
        if (props.viewingGroup) 
            props.setViewingGroup(false);
        else
            props.setViewingGroup(true);
    }

    function handleCopyButtonClick(event) {
        navigator.clipboard.writeText(inviteLink);
        setLinkFieldContent("Copied!");
        setTimeout(() => setLinkFieldContent(inviteLink), 1500);
        return;
    }

    return (
        <div className="left-bar">
            <div className="details">
                <h3 className="bold">{name}</h3>
                <p><span className="emoji">🕓</span> {meetingDuration} {meetingDurationUnits}</p>
                {(() => {
                    if (location == "google")
                        return(
                            <>
                                <p><span className="emoji">📍</span> On Google Meet</p>
                                <p className="label">Link will be sent out via calendar invite</p>
                            </>
                        );
                    else 
                        return( <p><span className="emoji">📍</span> {address}</p> );
                })()}
            </div>

            <div className="respondents">
                <h4 className="bold">🤝 Respondents</h4>
                <p className="label">Everyone who has added their availability</p>
                { respondents.map((data, key) =>
                    <p>{data}</p>
                )}
            </div>
            
            { isHost && !props.viewingGroup &&
                <div className="invite">
                    <h4 className="bold">💌 Invite </h4>
                    <p className="label">Share the link below to invite people to the meeting.</p>
                    <div className="input-group invite-link">
                        <input 
                            type="text" 
                            className={"form-control invite-field " + ((linkFieldContent == "Copied!") ? "copied" : "")} 
                            value={linkFieldContent} 
                        />
                        <div className="input-group-append">
                            <button className="copy-button solid-button" type="button" onClick={handleCopyButtonClick}><img src={copy_icon} /></button>
                        </div>
                    </div>
                </div>
            }

            <button className="transparent-button availability-button" onClick={changeViewButton}>
                {props.viewingGroup ? "View Your Availability" : "View Group's Availability"}
            </button>
        </div>
    );
}

export default LeftBar;