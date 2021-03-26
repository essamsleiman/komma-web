import react, { useState } from 'react'; 
import Dropdown from "./dropdown"; 
import DatePicker from "./date_picker"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import '../css/step_three.css'; 

function StepThree(props) { 

    const [showAdvanced, setShowAdvanced] = useState(false); 
    const [meetingLength, setMeetingLength] = useState('60 minute'); 
    const [meetingStartTime, setMeetingStartTime] = useState('9am'); 
    const [meetingEndTime, setMeetingEndTime] = useState('5pm'); 
    const [meetingRange, setMeetingRange] = useState('the next 7 days'); 
    const [timeZone, setTimeZone] = useState('Los Angeles (GMT-8)'); 
    const [meetingDuration, setMeetingDuration] = useState('60');
    const [meetingDurationUnit, setMeetingDurationUnit] = useState('minutes'); 

    const meetingLengths = [
        {
            label: '15 minute',
            value: '15m'
        },
        {
            label: '30 minute',
            value: '30m'
        },
        {
            label: '45 minute',
            value: '45m'
        },
        {
            label: '60 minute',
            value: '60m'
        }
    ]

    const meetingTimes = [
        {
            label: '12am',
            value: '12am' 
        },
        {
            label: '1am',
            value: '1am' 
        },
        {
            label: '2am',
            value: '2am' 
        },
        {
            label: '3am',
            value: '3am' 
        },
        {
            label: '4am',
            value: '4am' 
        },
        {
            label: '5am',
            value: '5am' 
        },
        {
            label: '6am',
            value: '6am' 
        },
        {
            label: '7am',
            value: '7am' 
        },
        {
            label: '8am',
            value: '8am' 
        },
        {
            label: '9am',
            value: '9am' 
        },
        {
            label: '10am',
            value: '10am' 
        },
        {
            label: '11am',
            value: '11am' 
        },
        {
            label: '12pm',
            value: '12pm' 
        },
        {
            label: '1pm',
            value: '1pm' 
        },
        {
            label: '2pm',
            value: '2pm' 
        },
        {
            label: '3pm',
            value: '3pm' 
        },
        {
            label: '4pm',
            value: '4pm' 
        },
        {
            label: '5pm',
            value: '5pm' 
        },
        {
            label: '6pm',
            value: '6pm' 
        },
        {
            label: '7pm',
            value: '7pm' 
        },
        {
            label: '8pm',
            value: '8pm' 
        },
        {
            label: '9pm',
            value: '9pm' 
        },
        {
            label: '10pm',
            value: '10pm' 
        },
        {
            label: '11pm',
            value: '11pm' 
        },
    ]

    const meetingRanges = [
        {
            label: 'the next day',
            value: 'the next day',
        },
        {
            label: 'the next 3 days',
            value: 'the next 3 days',
        },
        {
            label: 'the next 5 days',
            value: 'the next 5 days',
        },
        {
            label: 'the next 7 days',
            value: 'the next 7 days',
        },
        {
            label: 'the next month',
            value: 'the next month',
        }
    ]

    const timeZones = [
        {
            label: 'Los Angeles (GMT-8)',
            value: 'Los Angeles (GMT-8)',
        },
        {
            label: 'New York (GMT-5)',
            value: 'New York (GMT-5)', 
        }
    ]

    const meetingDurations = [
        {
            label: '15',
            value: '15',
        },
        {
            label: '30',
            value: '30',
        },
        {
            label: '45',
            value: '45',
        },
        {
            label: '60',
            value: '60',
        },
    ]

    const meetingDurationUnits = [
        {
            label: 'minutes',
            value: 'minutes',
        },
        {
            label: 'hours',
            value: 'hours',
        },
    ]

    function changeAdvancedDisplay() {
        console.log('click triggered')
        let isVisible = showAdvanced
        setShowAdvanced(!isVisible);
        console.log(showAdvanced);
    }

    function next() {
        props.setActiveStep(4) 
    }

    function back() {
        props.setActiveStep(2) 
    }

    return props.activeStep == 3 && (
        <div className="container-fluid p-0">
            <div className="row no-gutters">
                <div className="col-sm-12 container">
                    <div className="content"> 
                        <h3 className="bold">⏰What general time range would be best?</h3>
                        <label class="switch">
                            <input type="checkbox" onClick={changeAdvancedDisplay} />
                            <span class="slider round" ></span>
                        </label>
                        <div className="advanced-select-text-wrapper">
                            <p className="label">Advanced Date Selection</p> 
                        </div>
                        <br />
                        { !showAdvanced && 
                        <>
                            <p className="left-inline-text">A</p>
                            <div className="dropdown-wrapper">
                                <Dropdown
                                    name="length"
                                    title={meetingLength}
                                    list={meetingLengths}
                                    setter={setMeetingLength}
                                    size="dd-wrapper-medium"
                                    enableScroll="dd-no-scroll"
                                />
                            </div>
                            <p className="middle-inline-text">meeting between</p>
                            <div className="dropdown-wrapper">
                                <Dropdown
                                    name="length"
                                    title={meetingStartTime}
                                    list={meetingTimes}
                                    setter={setMeetingLength}
                                    size="dd-wrapper-small"
                                    enableScroll="dd-scroll"
                                />
                            </div>
                            <p className="middle-inline-text">and</p>
                            <div className="dropdown-wrapper">
                                <Dropdown
                                    name="length"
                                    title={meetingEndTime}
                                    list={meetingTimes}
                                    setter={setMeetingLength}
                                    size="dd-wrapper-small"
                                    enableScroll="dd-scroll"
                                />
                            </div>
                            <p className="middle-inline-text">in</p>
                            <div className="dropdown-wrapper">
                                <Dropdown
                                    name="length"
                                    title={meetingRange}
                                    list={meetingRanges}
                                    setter={setMeetingLength}
                                    size="dd-wrapper-large"
                                    enableScroll="dd-no-scroll"
                                />
                            </div>
                        </>}
                        { showAdvanced && 
                        <>
                            <div className="row no-gutters">
                                <div className="col-sm-8">
                                    <p className="bold">Select Dates</p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="bold">Select Time Range *</p>
                                </div>
                                <div className="col-sm-8">
                                    <DatePicker /> 
                                </div>
                                <div className="col-sm-4">
                                    <p className="label">Earliest Time</p>
                                    <div className="dropdown-wrapper">
                                        <Dropdown
                                            name="length"
                                            title={meetingStartTime}
                                            list={meetingTimes}
                                            setter={setMeetingLength}
                                            size="dd-wrapper-small"
                                            enableScroll="dd-scroll"
                                        />
                                    </div>
                                    <p className="middle-inline-text">to</p>
                                    <div className="dropdown-wrapper">
                                        <Dropdown
                                            name="length"
                                            title={meetingEndTime}
                                            list={meetingTimes}
                                            setter={setMeetingLength}
                                            size="dd-wrapper-small"
                                            enableScroll="dd-scroll"
                                        />
                                    </div>
                                    <div className="dropdown-wrapper">
                                        <Dropdown
                                            name="length"
                                            title={timeZone}
                                            list={timeZones}
                                            setter={setMeetingLength}
                                            size="dd-wrapper-large"
                                            enableScroll="dd-scroll"
                                        />
                                    </div> <br />
                                    <div className="dropdown-wrapper">
                                        <Dropdown
                                            name="length"
                                            title={meetingDuration}
                                            list={meetingDurations}
                                            setter={setMeetingLength}
                                            size="dd-wrapper-small"
                                            enableScroll="dd-scroll"
                                        />
                                    </div>
                                    <div className="dropdown-wrapper">
                                        <Dropdown
                                            name="length"
                                            title={meetingDurationUnit}
                                            list={meetingDurationUnits}
                                            setter={setMeetingLength}
                                            size="dd-wrapper-small"
                                            enableScroll="dd-scroll"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>}
                        {!showAdvanced && <br />}
                        <br />
                        <button className="hollow-button" style={{float: 'left'}} onClick={back}>Back</button>
                        <button className="solid-button" style={{float: 'right'}} onClick={next}>Next</button>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default StepThree;