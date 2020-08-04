import initActions from "./actions";
import initReducer from "./reducer";

const configureChatModule = (services) => {
    const actions = initActions(services.utilityService);
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureChatModule;