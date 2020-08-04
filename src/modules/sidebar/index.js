import initActions from "./actions";

const configureModule = (services) => {
    const actions = initActions();
    return { actions };
};

export default configureModule;