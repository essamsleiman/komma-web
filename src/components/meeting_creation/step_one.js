import react, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/step_one.css' 
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateEvent } from "../../Redux/actions/eventActions";
import { fetchUser } from "../../Redux/actions/userActions";

function StepOne(props) {
    useEffect(() => {
        console.log("hit fetchuser",  props.fetchUser());
        console.log("hit fetchuser",  props.user);
      }, []);

    const [meetingName, setMeetingName] = useState('');
    const [description, setDescription] = useState(''); 
    console.log("meetingName", meetingName)
    console.log("description", description)

    function handleMeetingNameChange(event) { 
        setMeetingName(event.target.value); 
    }

    function handleDescriptionChange(event) { 
        setDescription(event.target.value);
    }

    function next() {

        props.updateEvent(
            {
                meetingName: meetingName,
                description: description
            }
        )
        saveData()
        props.setActiveStep(2) 
    }

    function saveData() {
        let data = props.data
        data.meetingName = meetingName;
        data.description = description;
        props.setData(data);
    }

    return props.activeStep == 1 && (
        <div className="container-fluid p-0">
            <div className="row no-gutters justify-content-center">
                <div className="col-md-7">
                    <div className="shadow-card"> 
                        <h3 className="bold">🤝 Hello there! What is your meeting about?</h3>
                        <p className="label field-spacing">Meeting Title<span className="asterisk bold"> *</span></p> 
                        <input className="name-box form-control" type="text" placeholder="Weekly Meeting ..." value={meetingName} onChange={handleMeetingNameChange} /> 
                        <div className="question-spacing" /> 

                        <h3 className="bold">✅ Any agenda items?</h3>
                        <p className="label field-spacing">Description</p> 
                        <textarea className="description-box form-control" type="text" placeholder="1. Get the ducks in a row&#x0a;2. Boil the ocean&#x0a;..." rows="6" value={description} onChange={handleDescriptionChange} />
                        <div className="nav-buttons row no-gutters">
                            <div className="col d-flex justify-content-end">
                                {meetingName ? 
                                    <button className={"solid-button"} onClick={meetingName && next}>Next</button> : 
                                    <button disabled className={"disabled-button"} onClick={meetingName && next}>Next</button> 
                                }
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}

//

StepOne.propTypes = {
    updateEvent: PropTypes.func.isRequired,
    event: PropTypes.array.isRequired,
    fetchUser: PropTypes.func.isRequired,
    user: PropTypes.array.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    event: state.event.newEvent,
    user: state.user.user,
  });
  
  export default connect(mapStateToProps, { updateEvent, fetchUser })(StepOne);
  