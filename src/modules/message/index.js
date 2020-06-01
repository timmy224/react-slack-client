import initActions from "./actions";
import initReducer from "./reducer";

const configureMessageModule = () => {
    const actions = initActions();
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureMessageModule;