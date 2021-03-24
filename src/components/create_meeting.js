import react, { useState, } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Step_one from './meeting_creation/step_one'
import Step_two from './meeting_creation/step_two'
import Step_three from './meeting_creation/step_three'
import Step_four from './meeting_creation/step_four'
import './css/create_meeting.css'


function CreateMeeting() {

    const [activeStep, setActiveStep] = useState(1)
    const [data, setData] = useState({}) 

    return (
        <div className="container-fluid p-0">
            <div className="row no-gutters justify-content-center">
                <div className="col-sm-10 content-padding">
                    <Step_one activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} />
                    <Step_two activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} />
                    <Step_three activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} />
                    <Step_four activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} />
                </div>
            </div>
        </div>
    );
}

export default CreateMeeting;
