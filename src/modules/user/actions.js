import types from "./types";
import { actionCreator } from "../utils";

const initActions = function() {

	const settingUsername = actionCreator(types.SET_USERNAME)
	const setUsername = (username) => (dispatch)=>{
		dispatch(settingUsername(username))
	};
	
	const usernameTaken = actionCreator(types.TAKEN_USERNAME)
	const takenUsername = (isUsernameTaken) =>(dispatch)=>{
		dispatch(usernameTaken(isUsernameTaken))
	};

	return { setUsername, takenUsername};
}

export default initActions


