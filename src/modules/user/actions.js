import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function(userService, socketService, storageService, authService, permissionService) {

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
		const [err, usernames] = await to(userService.fetchUsernames());
		if (err) {
			throw new Error("Could not fetch usernames");
		}
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

	const loginActionCreator = actionCreator(types.LOGIN);
	const login = (username, password) => async (dispatch, getState) => {
		const [err, data] = await to(authService.loginUser(username, password))
		if (err) {
			throw new Error("Could not log in");
		}
		if (data.isAuthenticated) {
			storageService.set("username", username);
			await dispatch(actions.permission.fetchPermissions());
			dispatch(loginActionCreator())
			dispatch(actions.route.changeRoute({path: "/main"}));
		} else {
			dispatch(actions.user.wrongCredentials(true));
		}
	};

	const logoutActionCreator = actionCreator(types.LOGOUT);
	const logout = (withServerCall = true) => async (dispatch, getState) => {
		const username = getState().user.username;
		if (withServerCall) {
			const [err, success] = await to(userService.logout(username));
			if (err) {
				throw new Error("Could not log out");
			}
		}
		socketService.disconnect()
		storageService.removeItem("username");
		storageService.removeItem("csrf-token");
		dispatch(logoutActionCreator({}))
		dispatch(actions.route.changeRoute({path: "/login"}));
	};

	return { 
		setUsername,
		takenUsername,
		fetchUsernames,
		wrongCredentials,
		setPassword,
		missingCredentials,
		login,
		logout,
	};
}

export default initActions;


