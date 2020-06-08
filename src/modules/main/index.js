import initActions from "./actions";

const configureModule = () => {
    const actions = initActions();
    return { actions };
};

export default configureModule;