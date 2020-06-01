// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import configureChannelModule from "./channel";
import configureUserModule from './user';
import configureRouteModule from './routes'
import configureMessageModule from './message'
import { extractActions, extractReducers } from "./extract";

const configureModules = services => {
    const channelModule = configureChannelModule(services); 
    const userModule = configureUserModule();
    const routeModule = configureRouteModule();
    const messageModule = configureMessageModule();

    const modules = {
         channel: channelModule, 
         user: userModule,
         route: routeModule,
         message: messageModule
    };

    return {
        actions: extractActions(modules),
        reducers: extractReducers(modules),
    };
};

export default configureModules;