import { Subject } from "rxjs";
// TODO - uncomment once socketService is in the project
// import * as socketService from "./socket-service";

let messages$ = new Subject();
let joinedChat$ = new Subject();

export const getMessages$ = () => messages$;
export const getJoinedChat$ = () => joinedChat$;

// TODO - uncomment once socketService is in the project
// export const sendMessage = message => socketService.send("send-message", message)

// TODO - remove once socketService is in the project and the real sendMessage() above is uncommented
export const sendMessage = message => console.log("Sending message to socketService", message);

export const onMessagesReceived = messages => {
    for (const message of messages) {
        onMessageReceived(message);
    }
};
export const onMessageReceived = message => messages$.next(message);

export const onUserJoinedChat = username => joinedChat$.next(username);