import initActions from "./actions";
import initReducer from "./reducer";

const configurePermissionModule = (services) => {
    const actions = initActions(services.permissionService);
    const reducer = initReducer();
    return { actions, reducer };
}

export default configurePermissionModule;