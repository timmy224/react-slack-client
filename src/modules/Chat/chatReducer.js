import { MESSAGE_UPDATE } from "./chatTypes";
const INITIAL_STATE = {
  messages: ["Hello World!", "Hi again"],
};

const chatReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case MESSAGE_UPDATE:
      console.log("reducer");
      return { ...state, payload };

    default:
      return state;
  }
};
export default chatReducer;
