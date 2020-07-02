// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import configureRouteModule from "./routes";
import configureUserModule from "./user";
import configureMessageModule from "./message";
import configureChannelModule from "./channel";
import configureSidebarModule from "./sidebar";
import configureChatModule from "./chat";
import configureMainModule from "./main";
import { extractActions, extractReducers } from "./extract";

const configureModules = services => {
    const routeModule = configureRouteModule();
    const userModule = configureUserModule(services);
    const messageModule = configureMessageModule(services);
    const channelModule = configureChannelModule(services); 
    const sidebarModule = configureSidebarModule(services);
    const chatModule = configureChatModule();
    const mainModule = configureMainModule();

    const modules = {
        route: routeModule,
        user: userModule,
        message: messageModule,
        channel: channelModule,
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