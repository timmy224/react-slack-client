// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import configureChannelModule from "./channel";
import configureUserModule from './user';
import configureRouteModule from './routes'
import configureMessageModule from './message'
import configureSidebarModule from "./sidebar";
import configureChatModule from "./chat";
import configureMainModule from "./main";
import { extractActions, extractReducers } from "./extract";

const configureModules = services => {
    const channelModule = configureChannelModule(services); 
    const userModule = configureUserModule(services);
    const routeModule = configureRouteModule();
    const messageModule = configureMessageModule(services);
    const sidebarModule = configureSidebarModule();
    const chatModule = configureChatModule();
    const mainModule = configureMainModule();

    const modules = {
         channel: channelModule, 
         user: userModule,
         route: routeModule,
         message: messageModule,
         sidebar: sidebarModule,
         chat: chatModule,
         main: mainModule,
    };

    return {
        actions: extractActions(modules),
        reducers: extractReducers(modules),
    };
};

export default configureModules;