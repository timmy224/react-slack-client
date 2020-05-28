import initActions from "./actions";
import initReducer from "./reducer";

const configureChannelModule = (services) => {
    const actions = initActions(services.channelService);
    const reducer = initReducer();

    return { actions, reducer };
};

export default configureChannelModule;