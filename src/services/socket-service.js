import io from "socket.io-client";
import { Subject } from "rxjs";
import { actions, store } from "../context";


function SocketService(chatService) {
    let socket;
    let isConnected = false;
    let connected$ = new Subject();

    const getConnected = () => isConnected;

    const getConnected$ = () => connected$;

    const connect = dataObject => {
        let localUrl = "http://localhost:5000";
        let remoteUrl = "https://react-slack-server.herokuapp.com";
        let value = dataObject.username
        let query_val = `username=${value}`
        let queryObj = { query: query_val }
        socket = io(localUrl, queryObj)
        setUpEventListeners();
        return socket
    };

    const send = (event_name, obj) => {
        // assuming socket declared when connected
        socket.emit(event_name, obj)
        console.log(event_name, "with", obj, "sent.")
    };

    // right now this is unused but will be on logout button pressed
    const disconnect = () => {
        // assuming socket declared when connected
        socket.emit("disconnect")
        socket.disconnect()
        isConnected = false;
        return "Socket disconnect sent"
    };

    const setUpEventListeners = () => {
        socket.on("connect", () => {
            isConnected = true;
            connected$.next(true);
        });

        socket.on("connect_error", () => {
            isConnected = false;
            connected$.next(false);
        });

        socket.on('user-joined-chat', (user_join) => {
            console.log("user_join", user_join);
            console.log(`User joined the chat: ${user_join.username}`);
            chatService.onUserJoinedChat(user_join.username);
        });

        socket.on('message-received', (message_received) => {
            console.log("message-received: ", message_received);
            console.log(
                `Sender: ${message_received.sender},
                Time Sent: ${message_received.time_sent},
                Content: ${message_received.content}`
            );
            chatService.onMessageReceived(message_received);
        });

        socket.on("channel-deleted", (channelId) => {
            store.dispatch(actions.channel.channelDeleted(channelId));
        });

        socket.on("channel-created", () => {
            store.dispatch(actions.channel.fetchChannels());
        });
        
        socket.on("added-to-channel", async (channelId) => {
            console.log("added-to-channel", channelId);
            await store.dispatch(actions.channel.fetchChannels());
            store.dispatch(actions.message.initChannelMessages(parseInt(channelId)));
            send("join-channel", channelId);
        })
 
    }

    return Object.freeze({
        getConnected,
        getConnected$,
        connect,
        send,
    });
}

export default SocketService;





