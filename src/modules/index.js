// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import configureRouteModule from "./routes";
import configureUserModule from "./user";
import configurePermissionModule from "./permission";
import configureMessageModule from "./message";
import configureChannelModule from "./channel";
import configureSidebarModule from "./sidebar";
import configureChatModule from "./chat";
import configureWorkspaceModule from "./workspace";
import configureMainModule from "./main";
import configureInvitationModule from "./invitation";
import configureOrgModule from "./org";
import { extractActions, extractReducers } from "./extract";

const configureModules = services => {
    const routeModule = configureRouteModule();
    const userModule = configureUserModule(services);
    const permissionModule = configurePermissionModule(services);
    const messageModule = configureMessageModule(services);
    const channelModule = configureChannelModule(services); 
    const sidebarModule = configureSidebarModule(services);
    const chatModule = configureChatModule(services);
    const workspaceModule = configureWorkspaceModule(services);
    const mainModule = configureMainModule(services);
    const invitationModule = configureInvitationModule(services);
    const orgModule = configureOrgModule(services);

    const modules = {
        route: routeModule,
        user: userModule,
        permission: permissionModule,
        message: messageModule,
        channel: channelModule,
        sidebar: sidebarModule,
        chat: chatModule,
        workspace: workspaceModule,
        main: mainModule,
        invitation : invitationModule,
        org: orgModule,
    };

    return {
        actions: extractActions(modules),
        reducers: extractReducers(modules),
    };
};

export default configureModules;