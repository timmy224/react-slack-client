import { Subject } from "rxjs";
import { actions, store } from "../context";

function ChatService(userService) {
    let joinedChat$ = new Subject();

    const getJoinedChat$ = () => joinedChat$;

    // destination parameter can either be a username or channel name
    const prepareMessage = (type, content, sender, destination, orgName) => {
        const dateOptions = { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric", hour12: true };
        const message = {
            type,
            sender,
            sent_dt: new Date().toLocaleDateString("en-US", dateOptions).replace(",", ""),
            content,
            org_name: orgName,
        };
        if (type === "channel") {
            message.channel_name = destination;
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

    const onMessageReceived = (message) => store.dispatch(actions.message.messageReceived(message))

    const onUserJoinedChat = (username) => joinedChat$.next(username);

    return Object.freeze({
        getJoinedChat$,
        prepareMessage,
        onMessagesReceived,
        onMessageReceived,
        onUserJoinedChat,
    });
}

export default ChatService;


