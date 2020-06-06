import { Subject } from "rxjs";

function ChatService(userService) {
    let messages$ = new Subject();
    let joinedChat$ = new Subject();

    const getMessages$ = () => messages$;
    const getJoinedChat$ = () => joinedChat$;

    const prepareMessage = (message_content, sender, channel_id) => {
        const message = {
            sender,
            time_sent: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            content: message_content,
            channel_id
        };
        return message;
    }

    const onMessagesReceived = (messages) => {
        for (const message of messages) {
            onMessageReceived(message);
        }
    };

    const onMessageReceived = (message) => {
        messages$.next(message);
    }

    const onUserJoinedChat = (username) => joinedChat$.next(username);

    return Object.freeze({
        getMessages$,
        getJoinedChat$,
        prepareMessage,
        onMessagesReceived,
        onMessageReceived,
        onUserJoinedChat,
    });
}

export default ChatService;


