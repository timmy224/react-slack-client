import ChannelService from "./channel-service";
import StorageService from "./storage-service";
import UserService from "./user-service";
import ChatService from "./chat-service";
import SocketService from "./socket-service";

const configureServices = () => {    
    const channelService = ChannelService();
    const storageService = StorageService();
    const userService = UserService(storageService);
    const chatService = ChatService(userService);
    const socketService = SocketService(chatService);

    return {
        channelService, 
        storageService,
        userService,
        chatService,
        socketService,
    };
};

export default configureServices;