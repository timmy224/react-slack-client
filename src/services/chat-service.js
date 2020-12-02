import { Subject } from "rxjs";

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

    const onUserJoinedChat = (username) => joinedChat$.next(username);

    return Object.freeze({
        getJoinedChat$,
        prepareMessage,
        onUserJoinedChat,
    });
}

export default ChatService;


