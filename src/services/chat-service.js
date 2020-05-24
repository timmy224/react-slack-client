import { Subject } from "rxjs";
import * as socketService from "./socket-service";
import * as userService from "./user-service";

let messages$ = new Subject();
let joinedChat$ = new Subject();

export const getMessages$ = () => messages$;
export const getJoinedChat$ = () => joinedChat$;

export const sendMessage = message_content => {
  const message = {
    sender: userService.getUsername(),
    time_sent: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    content: message_content
  };
  return socketService.send("send-message", message);
}

export const onMessagesReceived = (messages) => {
  for (const message of messages) {
    onMessageReceived(message);
  }
};
export const onMessageReceived = (message) => messages$.next(message);

export const onUserJoinedChat = (username) => joinedChat$.next(username);

// Week 1 Challenge
export const sendSpecialEvent = (message) => {
  console.log(message)
  return socketService.send("my-special-event", message);
}

// Week 1 Challenge
let specialObs$= new Subject(); // creates new observable
export const onSpecialReceived = (special_message) => specialObs$.next(special_message) // adds specials to observable 
export const getSpecial$ = () => specialObs$; // getter for observable
