import { FETCH_USER, NEW_USER } from "../actions/types";

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      console.log("fetching user: ", action.payload);
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
