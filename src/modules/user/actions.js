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

