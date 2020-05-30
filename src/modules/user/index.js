import initActions from "./actions";
import initReducer from "./reducer";


const configureUserModule = () =>{
	const actions = initActions();
	const reducer = initReducer();

	return { actions, reducer };
}

export default configureUserModule



//BELOW IS SAMPLE FROM CHANNEL MODULE
// import initActions from "./actions";
// import initReducer from "./reducer";

// const configureChannelModule = (services) => {
//     const actions = initActions(services.channelService);
//     const reducer = initReducer();

//     return { actions, reducer };
// };

// export default configureChannelModule;