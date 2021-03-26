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
        <div className="nav-buttons row no-gutters">
            <div className="col">
                <button className="hollow-button" onClick={back}>Back</button>
            </div>
            <div className="col d-flex justify-content-end">
                <button className="solid-button" onClick={next}>Next</button>
            </div>
        </div>
    );
}

export default StepThree;