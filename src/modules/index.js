// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import configureChannelModule from "./channel";
import configureUserModule from './user';
import { extractActions, extractReducers } from "./extract";

const configureModules = services => {
    const channelModule = configureChannelModule(services); 
    const userModule = configureUserModule();

    const modules = {
         channel: channelModule, userModule
    };

    return {
        actions: extractActions(modules),
        reducers: extractReducers(modules),
    };
};

export default configureModules;