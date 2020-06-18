import initActions from "./actions";
import initReducer from "./reducer";

const configureModule = (services) => {
    const actions = initActions(services.messageService);
    const reducer = initReducer();

    return { actions, reducer };
};


export default configureModule;