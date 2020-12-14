import { Subject } from "rxjs";

function ChatService(dateTimeService) {
    let joinedChat$ = new Subject();

    const getJoinedChat$ = () => joinedChat$;

    const MESSAGE_DT_FORMAT = "YYYY/MM/DD HH:mm:ss:SSS";

    // destination parameter can either be a username or channel name
    const prepareMessage = (type, content, sender, destination, orgName) => {
        const sentDt = dateTimeService.str(dateTimeService.now(), MESSAGE_DT_FORMAT);
        const message = {
            type,
            sender,
            sent_dt: sentDt,
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
        MESSAGE_DT_FORMAT,
        prepareMessage,
        onUserJoinedChat,
    });
}

export default ChatService;


