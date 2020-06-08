import initActions from "./actions";
import initReducer from "./reducer";

const configureChatModule = (services) => {
    const actions = initActions(services.messageService);
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureChatModule;