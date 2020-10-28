import initActions from "./actions";
import initReducer from "./reducer";

const configureOrgModule = (services) => {
    const actions = initActions(services.orgService);
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureOrgModule;