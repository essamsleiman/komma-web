import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/step_three.css' 


function StepThree(props) {

    function next() {
        props.setActiveStep(4) 
    }

    function back() {
        props.setActiveStep(2) 
    }

    return props.activeStep == 3 && (
        <div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button>Step Three</button>
        </div>
    );
}

export default StepThree;