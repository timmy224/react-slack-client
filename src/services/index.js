// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import ChannelService from "./channel-service";
import MessageService from "./message-service";
import StorageService from "./storage-service";
import UserService from "./user-service";
import ChatService from "./chat-service";
import SocketService from "./socket-service";
import UtilityService from "./utility-service";
import LoginService from "./login-service"

const configureServices = () => {    
    const channelService = ChannelService();
    const messageService = MessageService();
    const storageService = StorageService();
    const userService = UserService(storageService);
    const chatService = ChatService(userService);
    const socketService = SocketService(chatService);
    const utilityService = UtilityService();
    const loginService = LoginService();

    return {
        channelService, 
        messageService,
        storageService,
        userService,
        chatService,
        socketService,
        utilityService,
        loginService
    };
};

export default configureServices;