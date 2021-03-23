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
            <button>Step Three</button>
        </div>
    );
}

export default StepThree;