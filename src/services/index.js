// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import ChannelService from "./channel-service";
import MessageService from "./message-service";
import StorageService from "./storage-service";
import UserService from "./user-service";
import ChatService from "./chat-service";
import SocketService from "./socket-service";
import UtilityService from "./utility-service";
import AuthService from "./auth-service";
import RegisterService from "./register-service";
import ApiService from "./api-service";
import DemoService from "./demo-service";

const configureServices = () => {    
    const storageService = StorageService();
    const apiService = ApiService(storageService);
    const authService = AuthService(apiService);
    const registerService = RegisterService();
    const channelService = ChannelService(apiService);
    const messageService = MessageService(apiService);
    const userService = UserService(apiService);
    const chatService = ChatService(userService);
    const socketService = SocketService(chatService);
    const utilityService = UtilityService();
    const demoService = DemoService();
  
    return {
        storageService,
        apiService,
        authService,
        registerService,
        channelService, 
        messageService,
        userService,
        chatService,
        socketService,
        utilityService,
        demoService,
    };
};

export default configureServices;