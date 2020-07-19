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

	const settingPassword = actionCreator(types.SET_PASSWORD);
	const setPassword = (password) => (dispatch) => {
		dispatch(settingPassword(password))
	}

	const credentialsMissing = actionCreator(types.MISSING_CREDENTIALS);
	const missingCredentials = (isCredentialMissing) => (dispatch) => {
		dispatch(credentialsMissing(isCredentialMissing))
	}
  
	const credentialsWrong = actionCreator(types.INCORRECT_CREDENTIALS);
	const wrongCredentials = (areCredentialsIncorrect) => (dispatch) => {
		dispatch(credentialsWrong(areCredentialsIncorrect))
	};

	return { setUsername, takenUsername, fetchUsernames, wrongCredentials, setPassword, missingCredentials };

}

export default initActions;


