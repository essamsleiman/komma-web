import { FETCH_USER, NEW_USER } from "../actions/types";
import axios from "axios";

export function fetchUser() {
  return function (dispatch) {
    fetch("http://login.getkomma.com/auth/success", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        if (responseJson) {
          console.log("responseJson", responseJson);
          dispatch({
            type: FETCH_USER,
            payload: responseJson,
          });
        } else {
          console.log("no response from server");
        }
      })
      .catch((error) => {
        console.log(`error1: ${error}`);
      });
  };
}

//vals in responseJSON: userData, userEventData
