import types from "./types";
import { actionCreator } from "../utils";

const initActions = function(userService) {

	const settingUsername = actionCreator(types.SET_USERNAME);
	const setUsername = (username) => (dispatch) => {
		dispatch(settingUsername(username))
	};
	
	const usernameTaken = actionCreator(types.TAKEN_USERNAME);
	const takenUsername = (isUsernameTaken) => (dispatch) => {
		dispatch(usernameTaken(isUsernameTaken))
	};

	const usernamesFetch = actionCreator(types.FETCH_USERNAMES);
	const fetchUsernames = () => async (dispatch) => {
		const usernames = await userService.fetchUsernames();
		dispatch(usernamesFetch(usernames));
	}
	const usernameWrong = actionCreator(types.WRONG_USERNAME);
	const wrongUsername = (isUsernameWrong) => (dispatch) => {
		dispatch(usernameWrong(isUsernameWrong))
	};
	const passwordWrong= actionCreator(types.WRONG_PASSWORD);
	const wrongPassword = (isPasswordWrong) => (dispatch) => {
		dispatch(passwordWrong(isPasswordWrong))
	};
	const settingPassword = actionCreator(types.SET_PASSWORD);
	const setPassword = (password) => (dispatch) => {
		dispatch(settingPassword(password))
	};

	return { setUsername, takenUsername, fetchUsernames, wrongUsername, wrongPassword, setPassword };
}

export default initActions;


