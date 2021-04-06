import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer.js";
import userReducer from "./userReducer.js";

export default combineReducers({
  user: userReducer,
  calendar: calendarReducer,
});
