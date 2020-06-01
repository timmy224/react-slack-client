import types from "./types";


	const initReducer = () =>{
		const INITIAL_STATE  = {
			routePath: null,
			routeState: {},
		}
		
	const reducers = ( state = INITIAL_STATE, action = {})=>{
		const { type, payload } = action;
		switch(type){
            case types.CHANGE_ROUTE:
                return { ...state, routePath:payload.path,
                					routeState:payload.routeState}
            default:
            	return state;
        }};

        return  reducers ;
};
export default initReducer