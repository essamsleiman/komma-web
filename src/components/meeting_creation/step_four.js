import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/step_four.css' 

function StepFour(props) {

    function next() {
        // change the URL  
    }

    function back() {
        props.setActiveStep(3) 
    }

    return props.activeStep == 4 && (
        <div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button>Step Four</button>
        </div>
    );
}

export default StepFour;