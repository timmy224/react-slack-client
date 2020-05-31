import { CHANGE_ROUTE, ROUTE_TO_ALERT } from './constants.js'


	const initReducer = () =>{
		const INITIAL_STATE  = {
			routePath: null,
			routeState: {},
		}
		
	const reducers = ( state = INITIAL_STATE, action = {})=>{
		const { type, payload } = action;
		switch(type){
			case ROUTE_TO_ALERT:
                return {...state, routePath:payload,
                                    routeState: { alert: "Web socket connection error " }};
            case CHANGE_ROUTE:
                return { ...state, routePath:payload}
            default:
            return state;
        }};

        return  reducers ;
};
export default initReducer