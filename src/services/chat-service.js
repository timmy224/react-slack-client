import { Subject } from "rxjs";

function ChatService(userService) {
  let messages$ = new Subject();
  let joinedChat$ = new Subject();

  const getMessages$ = () => messages$;
  const getJoinedChat$ = () => joinedChat$;

  const prepareMessage = message_content => {
    const message = {
      sender: userService.getUsername(),
      time_sent: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      content: message_content
    };
    return message;
  }

  const onMessagesReceived = (messages) => {
    for (const message of messages) {
      onMessageReceived(message);
    }
  };

  const onMessageReceived = (message) => messages$.next(message);

  const onUserJoinedChat = (username) => joinedChat$.next(username);

  // observables for channel test below
  let channelMessages$ = new Subject();
  const getChannelMessages$ = () => channelMessages$;
  const onChannelReceived = (message) => channelMessages$.next(message)

  return Object.freeze({
    getMessages$,
    getJoinedChat$,
    prepareMessage,
    onMessagesReceived,
    onMessageReceived,
    onUserJoinedChat,
    channelMessages$,
    getChannelMessages$,
    onChannelReceived,
  });
}

export default ChatService;


