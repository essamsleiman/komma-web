import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Home() {
  function signin() {}
  console.log("COOKIE", document.cookie);
  const [userToken, setUserToken] = useState();
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
          console.log("RESPONSE In HOme: ", responseJson);
          setUserToken(responseJson);
        } else {
          console.log("no response from server");
        }
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          window.open("http://localhost:5000/auth/google", "_self");
        }}

        // onClick={() => {
        //   axios.get("http://localhost:5000/auth/google").then((response) => {

        //       if (response) {
        //         console.log("ESSAM RESPONSE: ",response)
        //       } else {
        //         console.log("no response from server");
        //       }
        //     });
        //window.open("http://localhost:5000/auth/events", "_self");
        // }}
      >
        Sign in with Google
      </button>
      <button
        onClick={() => {
          console.log("FRONTEND ERROR ESSAM");
          console.log("userToken:", userToken);
          axios
            .get("http://localhost:5000/auth/events", {
              headers: {
                Authorization: `Bearer ${userToken.accessToken}`,
              },
            })
            .then((response) => {
              if (response) {
                console.log(response);
              } else {
                console.log("no response from server");
              }
            });
          //window.open("http://localhost:5000/auth/events", "_self");
        }}
      >
        Sync with Calendar
      </button>
    </div>
  );
}

export default Home;
