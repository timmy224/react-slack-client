import types from "./types";
<<<<<<< HEAD
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

=======

    const initActions = function() {
		
		const setUsername = (username) =>(dispatch)=>{
			dispatch({	type : types.SET_USERNAME,
						payload : username})
		};
		const takenUsername = (isUsernameTaken) =>(dispatch)=>{
			dispatch({	type: types.TAKEN_USERNAME,
						payload: isUsernameTaken })
		};

>>>>>>> dev
		return { setUsername, takenUsername};
	}
export default initActions

