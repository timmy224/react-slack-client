import initActions from "./actions";
import initReducer from "./reducer";

const configureInvitationModule = () => {
    const actions = initActions();
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureInvitationModule;