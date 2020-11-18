import io from "socket.io-client";
import { Subject } from "rxjs";
import { actions, store } from "../context";
import { config } from "../Config";

function SocketService(chatService) {
    let socket;
    let isConnected = false;
    let connected$ = new Subject();

    const getConnected = () => isConnected;

    const getConnected$ = () => connected$;

    const connect = dataObject => {
        const url = config.API_URL;
        let value = dataObject.username
        let query_val = `username=${value}`
        let queryObj = { query: query_val }
        socket = io(url, queryObj)
        setUpEventListeners();
        return socket
    };

    const send = (event_name, obj) => {
        // assuming socket declared when connected
        socket.emit(event_name, obj)
        console.log(event_name, "with", obj, "sent.")
    };

    const disconnect = () => {
        // assuming socket declared when connected
        socket.emit("disconnect")
        socket.disconnect()
        isConnected = false;
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

    socket.on("channel-deleted", channelId => {
      store.dispatch(actions.channel.channelDeleted(channelId));
    });

    socket.on("added-to-channel", async channelId => {
      console.log("added-to-channel", channelId);
      // TODO: add channel to redux here once it's being sent by server side 
      store.dispatch(actions.message.initChannelMessages(parseInt(channelId)));
      send("join-channel", channelId);
    });

    socket.on("permissions-updated", () => {
      console.log("permissions-updated");
      store.dispatch(actions.permission.fetchPermissions());
    });

    socket.on("invited-to-org", orgName => {
      console.log("invited-to-org", orgName);
      store.dispatch(actions.invitation.fetchInvitations());
    });

    socket.on("added-to-org", orgName => {
      console.log("added-to-org", orgName);
      store.dispatch(actions.org.fetchOrgs());
    });
  };

  return Object.freeze({
    getConnected,
    getConnected$,
    connect,
    send,
    disconnect
  });
}

export default SocketService;
