import { GET_MONITOR } from "../constants/action-types";

const initialState = {
  monitor: {},
};

async function rootReducer(state = initialState, action) {
  if (action.type === GET_MONITOR) {
    console.log(action)
    return Object.assign({}, state, {
      monitor: action.payload
    });
  }

  return state;
};

export default rootReducer;