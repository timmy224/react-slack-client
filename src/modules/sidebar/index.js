import initActions from "./actions";

const configureModule = (services) => {
    const actions = initActions(services.utilityService);
    return { actions };
};

export default configureModule;