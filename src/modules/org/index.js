import initActions from "./actions";
import initReducer from "./reducer";

const configureOrgModule = (services) => {
    const actions = initActions(services.orgService, services.utilityService);
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureOrgModule;