import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/step_one.css' 

function StepOne(props) {

    function next() {
        props.setActiveStep(2) 
    }

    return props.activeStep == 1 && (
        <div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button className="solid_button" onClick={next}>Next</button> <br /><br />
            <button className="hollow_button" onClick={next}>Back</button> <br /><br />
            <button className="disabled_button" onClick={next}>Disabled</button>
        </div>
    );
}

export default StepOne;