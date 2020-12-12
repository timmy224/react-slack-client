import { Subject } from "rxjs";
const dayjs = require("dayjs");

function ChatService(dateTimeService) {
    let joinedChat$ = new Subject();

    const getJoinedChat$ = () => joinedChat$;

    // destination parameter can either be a username or channel name
    const prepareMessage = (type, content, sender, destination, orgName) => {
        const date = new Date();
        const sentDt = dateTimeService.getDtStr();
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
        prepareMessage,
        onUserJoinedChat,
    });
}

export default ChatService;


