import {
  UPDATE_EVENT
} from "../actions/types";

const initialState = {
  newEvent: {}
};


export default function(state = initialState, action) {
  switch (action.type) {
    
    case UPDATE_EVENT:
      console.log("UPDATE_EVENT: ", action.payload);
      return {
        ...state,
        newEvent: action.payload,
      };

    default:
      return state;
  }
}


