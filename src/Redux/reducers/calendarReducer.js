import { FETCH_CALENDAR } from "../actions/types";

const initialState = {
  calendar: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CALENDAR:
      console.log("fetching calendar: ", action.payload);
      return {
        ...state,
        calendar: action.payload,
      };

    default:
      return state;
  }
}
