<<<<<<< HEAD
import { SET_USERNAME, TAKEN_USERNAME, MESSAGE_RECEIVED } from "./constants.js";

const initActions = function () {
  const setUsername = (usernameValue) => ({
    type: SET_USERNAME,
    payload: usernameValue,
  });
  const takenUsername = (bool) => ({
    type: TAKEN_USERNAME,
    payload: bool,
  });
  const messageReceived = (message) => {
    console.log(message);
    return {
      type: MESSAGE_RECEIVED,
      payload: message,
    };
  };

  return { setUsername, takenUsername, messageReceived };
};
export default initActions;
=======
import types from "./types";

    const initActions = function() {
		
		const setUsername = (username) =>(dispatch)=>{
			dispatch({	type : types.SET_USERNAME,
						payload : username})
		};
		const takenUsername = (isUsernameTaken) =>(dispatch)=>{
			dispatch({	type: types.TAKEN_USERNAME,
						payload: isUsernameTaken })
		};

		return { setUsername, takenUsername};
	}
export default initActions

>>>>>>> dev
