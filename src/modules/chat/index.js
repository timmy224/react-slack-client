import initActions from "./actions";
import initReducer from "./reducer";

const configureChatModule = () => {
    const actions = initActions();
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureChatModule;