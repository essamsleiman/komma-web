import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Step_one from "./meeting_creation/step_one";
import Step_two from "./meeting_creation/step_two";
import Step_three from "./meeting_creation/step_three";
import Step_four from "./meeting_creation/step_four";
import "./css/create_meeting.css";
import axios from "axios";

function CreateMeeting() {
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState({});
  const [user, setUser] = useState({});

  //   useEffect(() => {
  //     console.log("IN USE EFFECT");
  //     axios.get("http://localhost:5000/auth/success").then((response) => {
  //       if (response) {
  //         console.log("ESSAM SUCESS: ", response);
  //         setUser(response);
  //       } else {
  //         console.log("no response from server");
  //       }
  //     });
  //   }, []);

  useEffect(() => {
    //   val = profileInfoState.userEventData;
    fetch("http://localhost:5000/auth/success", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        if (responseJson) {
          console.log("RESPONSE IS ESSAM: ", responseJson);
        } else {
          console.log("no response from server");
        }
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row no-gutters justify-content-center">
        <div className="col-sm-10 content-padding">
          <Step_one
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            data={data}
            setData={setData}
          />
          <Step_two
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            data={data}
            setData={setData}
          />
          <Step_three
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            data={data}
            setData={setData}
          />
          <Step_four
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            data={data}
            setData={setData}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateMeeting;
