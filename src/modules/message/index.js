import initActions from "./actions";
import initReducer from "./reducer";

const configureMessageModule = (services) => {
    const actions = initActions(services.messageService);
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureMessageModule;