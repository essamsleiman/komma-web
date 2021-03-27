import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/step_one.css' 

function StepOne(props) {

    const [meetingName, setMeetingName] = useState('');
    const [description, setDescription] = useState(''); 

    function handleMeetingNameChange(event) { 
        setMeetingName(event.target.value); 
    }

    function handleDescriptionChange(event) { 
        setDescription(event.target.value);
    }

    function next() {
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
            <div className="row no-gutters">
                <div className="col-md-7 container">
                    <div className="content"> 
                        <h3 className="bold">🤝Hello there! What is your meeting about?</h3>
                        <p className="label label-spacing">Meeting Title</p> 
                        <input className="name-box" type="text" value={meetingName} onChange={handleMeetingNameChange} /> 
                        <div className="question-spacing" /> 

                        <h3 className="bold">✅Any agenda items?</h3>
                        <p className="label label-spacing">Description</p> 
                        <textarea className="description-box" type="text" rows="6" value={description} onChange={handleDescriptionChange} />
                        <button className="solid-button button-spacing" onClick={next}>Next</button>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default StepOne;