import { Subject } from "rxjs";

function ChatService(userService) {
    let messages$ = new Subject();
    let joinedChat$ = new Subject();

    const getMessages$ = () => messages$;
    const getJoinedChat$ = () => joinedChat$;

    // destination parameter can either be a username or channel_id
    const prepareMessage = (type, content, sender, destination) => {
        const message = {
            type,
            sender,
            time_sent: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            content,
        };
        if (type === "channel") {
            message.channel_id = destination;
        } else if (type === "private") {
            message.receiver = destination;
        }
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


