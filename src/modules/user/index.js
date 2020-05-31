import initActions from "./actions";
import initReducer from "./reducer";


const configureUserModule = () =>{
	const actions = initActions();
	const reducer = initReducer();

	return { actions, reducer };
}

export default configureUserModule

