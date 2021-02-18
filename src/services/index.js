// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import ChannelService from "./channel-service";
import MessageService from "./message-service";
import StorageService from "./storage-service";
import UserService from "./user-service";
import PermissionService from "./permission-service";
import DateTimeService from "./datetime-service";
import ChatService from "./chat-service";
import SocketService from "./socket-service";
import UtilityService from "./utility-service";
import AuthService from "./auth-service";
import RegisterService from "./register-service";
import ApiService from "./api-service";
import DemoService from "./demo-service";
import InvitationService from "./invitation-service";
import OrgService from "./org-service";
import ModalOptionsService from "./modal-options-service";

const configureServices = () => {    
    const storageService = StorageService();
    const apiService = ApiService(storageService);
    const authService = AuthService(apiService);
    const registerService = RegisterService(apiService);
    const channelService = ChannelService(apiService);
    const messageService = MessageService(apiService);
    const permissionService = PermissionService(apiService);
    const userService = UserService(apiService);
    const dateTimeService = DateTimeService();
    const chatService = ChatService(dateTimeService);
    const socketService = SocketService(chatService);
    const utilityService = UtilityService();
    const demoService = DemoService();
    const invitationService  = InvitationService(apiService);
    const orgService = OrgService(apiService);
    const modalOptionsService = ModalOptionsService();
  
    return {
        storageService,
        apiService,
        authService,
        registerService,
        channelService, 
        messageService,
        permissionService,
        userService,
        dateTimeService,
        chatService,
        socketService,
        utilityService,
        demoService,
        invitationService,
        orgService,
        modalOptionsService
    };
};

export default configureServices;