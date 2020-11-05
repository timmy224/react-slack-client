import initActions from "./actions";
import initReducer from "./reducer";

const configureWorkspaceModule = (service) => {
    const actions = initActions();
    const reducer = initReducer();
    return { actions, reducer };
};

export default configureWorkspaceModule;