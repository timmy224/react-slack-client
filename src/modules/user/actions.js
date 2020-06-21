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

	const updatedFormField = actionCreator(types.FORM_FIELD_UPDATED);
	const formFieldUpdated = (field, value) => (dispatch) => {
		dispatch(updatedFormField({field: field, value: value}));
	};

	const formReset = actionCreator(types.RESET_FORM);
	const resetForm = () => (dispatch) => {
		dispatch(formReset());
	};

	const submitForm = () => async (dispatch, getState) => {
		const userInfo = getState().user.form;
		await userService.sendUserInfo(userInfo); 
		dispatch(resetForm());
	};

	return { setUsername, takenUsername, fetchUsernames, formFieldUpdated, resetForm, submitForm };
}

export default initActions;


