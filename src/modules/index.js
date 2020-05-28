// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import configureChannelModule from "./channel";
import { extractActions, extractReducers } from "./extract";

const configureModules = services => {
    const channelModule = configureChannelModule(services);

    const modules = {
        channel: channelModule,
    };

    return {
        actions: extractActions(modules),
        reducers: extractReducers(modules),
    };
};

export default configureModules;