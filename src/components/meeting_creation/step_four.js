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
        <div className="row no-gutters justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="when-send">
                        <h3 className="bold">💌️ When would you like us to send out invites?</h3>
                        <p>Your guests will be asked for their emails when responding.</p>
                        <input type="radio" id="num-days" name="whenSend"/>
                        <label for="num-days">In days</label><br/>
                        <input type="radio" id="num-responses" name="whenSend"/>
                        <label for="num-responses">After people respond, other than you</label><br/>
                    </div>
                    
                    <div className="options">
                        <h3 className="bold">⚡️ Additional Options</h3>
                        <p>Enable some super powered features.</p>
                        <input type="checkbox" className="" id="notify"/>
                        <label className="" for="notify">Notify me each time someone responds</label><br/>
                        <input type="checkbox" className="" id="hidden"/>
                        <label className="" for="hidden">Keep my availability hidden from respondents</label><br/>
                    </div>

                    <div className="next">
                        <h3 className="bold">😄️️ So what’s next?</h3>
                        <p>Share the link on the next page with your guests.</p>
                        <p>We’ll send out meeting invites in 7 days.</p>
                        <p>Be sure to add your availability as well!</p>
                    </div>

                    <div className="nav-buttons row no-gutters">
                        <div className="col">
                            <button className="hollow-button" onClick={back}>Back</button>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <button className="solid-button" onClick={next}>Confirm Meeting</button>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary">Primary</button>
                </div>
            </div>
        </div>
    );
}

export default StepFour;