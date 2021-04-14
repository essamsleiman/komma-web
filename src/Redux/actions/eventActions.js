import {
  UPDATE_EVENT
} from "../actions/types";
import axios from "axios";


export function updateEvent(arg) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_EVENT,
      payload: arg,
    });   
  };
}
















// dispatch({
//   type: NEW_ORG,
//   payload: res.data,
// })