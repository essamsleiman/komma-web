import react, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import StepOne from './meeting_creation/step_one'
import StepTwo from './meeting_creation/step_two'
import StepThree from './meeting_creation/step_three'
import StepFour from './meeting_creation/step_four'
import './css/create_meeting.css'

function CreateMeeting() {

    const [activeStep, setActiveStep] = useState(1); 
    const [stepPercentage, setStepPercentage] = useState('25%'); 
    const [stepText, setStepText] = useState('About');
    const [showAdvanced, setShowAdvanced] = useState(false);  
    const [data, setData] = useState({}); 

    useEffect(() => {
        switch(activeStep) {
            case 1: 
                setStepPercentage('25%');
                setStepText('About');
                break;
            case 2: 
                setStepPercentage('50%');
                setStepText('Location');
                break;
            case 3: 
                setStepPercentage('75%');
                setStepText('Time & Date');
                break;
            case 4: 
                setStepPercentage('100%');
                setStepText('Confirm');
                break;
            default:
                break;
        }
    }, [activeStep]) 
    
    return (
        <div>
            <div className="row no-gutters justify-content-center">
                <div className="col-md-6">
                    <div className="progress-bar-text-container content-padding"> 
                        <p className="bold progress-bar-text">{stepText}</p>
                        <p className="bold progress-bar-text" align="right">{activeStep}/4</p>
                    </div>
                    <div class="progress" style={{marginTop: '-0.8rem'}}>
                        <div class="progress-bar" role="progressbar" style={{width: stepPercentage}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div className="steps col-12" style={{marginTop: '1rem'}}>
                    <StepOne activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} />
                    <StepTwo activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} />
                    <StepThree activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced} />
                    <StepFour activeStep={activeStep} setActiveStep={setActiveStep} data={data} setData={setData} />
                </div>
            </div>
        </div>
    );
}

export default CreateMeeting;
