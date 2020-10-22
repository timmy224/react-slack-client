import initActions from "./actions";
import initReducer from "./reducer";

const configureInvitationModule = (services) => {
    const actions = initActions(services.invitationService);
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureInvitationModule;