import { FETCH_CALENDAR } from "../actions/types";
import axios from "axios";

export function fetchCalendar(accessToken) {
  return function (dispatch) {
    axios
      .get("http://login.getkomma.com/auth/events", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((responseJson) => {
        if (responseJson) {
          console.log("responseJson", responseJson);
          dispatch({
            type: FETCH_CALENDAR,
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
