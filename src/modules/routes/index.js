import initActions from "./actions";
import initReducer from "./reducer";


const configureRouteModule = () =>{
	const actions = initActions();
	const reducer = initReducer();

	return { actions, reducer };
}

export default configureRouteModule;
