import io from "socket.io-client";
import { Subject } from "rxjs";
import * as chatService from "./chat-service";

let socket; 
let connected$ = new Subject();

export const getConnected$ = () => connected$;

export function connect(dataObject) { 
    let localUrl = "http://localhost:5000";
    let remoteUrl = "https://react-slack-server.herokuapp.com";
    let value = dataObject.username
    let query_val = `username=${value}`
    let queryObj = {query: query_val}
    socket = io(localUrl, queryObj) // changed to localUrl
    setUpEventListeners();
    return socket 
}

export function getSocket() {
    return socket;
}

export function send(event_name, obj) {
    // assuming socket declared when connected
    socket.emit(event_name, obj)
    console.log(event_name, " with ", obj, " sent.")
}

export function disconnect() {
    // assuming socket declared when connected
    socket.emit("disconnect")
    socket.disconnect()
    return "Socket disconnect sent"
}

export function setUpEventListeners() {
    socket.on("connect", () => {
    	connected$.next(true);
    });

	socket.on("connect_error", () => {
		connected$.next(false);
    });

    socket.on('message-catchup', (data) => {
        let messages = JSON.parse(data);
        chatService.onMessagesReceived(messages);
    })

    socket.on('user-joined-chat', (user_join) => {
        console.log("user_join", user_join);
        console.log(`User joined the chat: ${user_join.username}`);
        chatService.onUserJoinedChat(user_join.username);
    })

    socket.on('message-received', (message_received) => {
        console.log("message-received: ", message_received);
        console.log(
            `Sender: ${message_received.sender},
             Time Sent: ${message_received.time_sent},
             Content: ${message_received.content}`
        );
        chatService.onMessageReceived(message_received);
    })

    socket.on("special-message-received", (special_message) => {
        console.log("special message: ", special_message);
    })
}


