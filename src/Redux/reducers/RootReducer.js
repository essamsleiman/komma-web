import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer.js";
import userReducer from "./userReducer.js";
import eventReducer from "./eventReducer.js";


export default combineReducers({
  user: userReducer,
  calendar: calendarReducer,
  event: eventReducer,
});
