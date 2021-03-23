import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/step_one.css' 

function StepOne(props) {

    function next() {
        props.setActiveStep(2) 
    }

    return props.activeStep == 1 && (
        <div>
            <button className="solid-button" onClick={next}>Next</button> <br /><br />
            <button className="hollow-button" onClick={next}>Back</button> <br /><br />
            <button className="disabled-button" onClick={next}>Disabled</button>
        </div>
    );
}

export default StepOne;