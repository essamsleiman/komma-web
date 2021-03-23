import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/step_two.css' 

function StepTwo(props) {

    function next() {
        props.setActiveStep(3) 
    }

    function back() {
        props.setActiveStep(1) 
    }

    return props.activeStep == 2 && (
        <div>
            <button>Step Two</button>
        </div>
    );
}

export default StepTwo;