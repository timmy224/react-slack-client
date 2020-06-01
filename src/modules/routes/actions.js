import types from "./types";
import { actionCreator } from "../utils";

 const initActions = function() {
 	const routeChange = actionCreator(types.CHANGE_ROUTE)
	const changeRoute = (route) => (dispatch) => {
                   dispatch(routeChange(route));
	};

	return { changeRoute };
		
	};

export default initActions;
