import { Subject } from "rxjs";
import * as socketService from "./socket-service";

let messages$ = new Subject();
let joinedChat$ = new Subject();

export const getMessages$ = () => messages$;
export const getJoinedChat$ = () => joinedChat$;

export const sendMessage = message => socketService.send("send-message", message)

export const onMessagesReceived = (messages) => {
  for (const message of messages) {
    onMessageReceived(message);
  }
};
export const onMessageReceived = (message) => messages$.next(message);

export const onUserJoinedChat = (username) => joinedChat$.next(username);
