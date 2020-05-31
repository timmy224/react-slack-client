import { CHANGE_ROUTE, ROUTE_TO_ALERT } from './constants.js'

 const initActions = function() {
	
	const routeToAlert = (route) =>({
			type: ROUTE_TO_ALERT,
			payload: route
		})
	const changeRoute = ( route )=>({
			type: CHANGE_ROUTE,
			payload: route
		})

	return { routeToAlert, changeRoute };
		
	};

export default initActions;