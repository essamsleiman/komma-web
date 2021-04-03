import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/step_two.css"
import google_meet_logo from "../../img/google_meet_logo.png"
import location_icon from "../../img/location_icon.png"

function StepTwo(props) {
    const [googleMeetSelected, setGoogleMeetSelected] = useState(false);
    const [inPersonSelected, setInPersonSelected] = useState(false);
    const [address, setAddress] = useState("");

    function next() {
        saveData();
        props.setActiveStep(3);
    }

    function back() {
        saveData();
        props.setActiveStep(1);
    }

    function saveData() {
        let data = props.data;
        data.location = getLocation();
        data.address = address;
        props.setData(data);
        console.log(props.data);
    }

    function getLocation() {
        if (googleMeetSelected)
            return "google";
        else
            return "in person";
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    return props.activeStep == 2 && (
        <div className="row no-gutters justify-content-center">
            <div className="col-md-7">
                <div className="shadow-card">
                    <h3 className="bold">📍 Where is your meeting?</h3>
                    <p>For online meetings, we'll generate the link for you!</p>

                    <button type="button" 
                            className={"loc-option " + (googleMeetSelected ? " active" : "")} 
                            onClick={() => {setGoogleMeetSelected(true);
                                            setInPersonSelected(false);}}
                    >
                        <div className="row align-items-center">
                            <div className="loc-name col-12">
                                <img src={google_meet_logo}/>
                                <p>Google Meet</p>
                            </div>
                        </div>
                    </button>
                    <button type="button"
                            className={"loc-option " + (inPersonSelected ? " active" : "")} 
                            onClick={() => {setGoogleMeetSelected(false);
                                            setInPersonSelected(true);}}
                    >
                        <div className="left">
                            <img src={location_icon}/>
                        </div>
                        <div className="right row no-gutters">
                            <div className="col-12">
                                <p>In Person</p>
                            </div>
                            <div className="loc-field col-12">
                                <p className="label">Location</p>
                                <input className="field form-control" type="text" placeholder="Tatooine ..." onChange={handleAddressChange}/>
                            </div>
                        </div>
                    </button>

                    <div className="nav-buttons row no-gutters">
                        <div className="col">
                            <button className="hollow-button" onClick={back}>Back</button>
                        </div>
                        <div className="col d-flex justify-content-end">
                            {(() => {
                                if (googleMeetSelected || (inPersonSelected && address))
                                    return <button className="solid-button" onClick={next}>Next</button>
                                else
                                    return <button disabled className="disabled-button">Next</button>
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepTwo;