import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function(messageService, socketService) {
    const receivedChannelMessage = actionCreator(types.CHANNEL_MESSAGE_RECEIVED);
    const receivedPrivateMessage = actionCreator(types.PRIVATE_MESSAGE_RECEIVED);
    const messageReceived = message => (dispatch, getState) => {
        const isChannelMessage = message["type"] === "channel";
        const isPrivateMessage = message["type"] === "private";
        if (isChannelMessage) {
            const messagePayload = {
                orgName: message["org_name"],
                channelName: message["channel_name"],
                message,
            };
            dispatch(receivedChannelMessage(messagePayload));
        } else if (isPrivateMessage) {
            const ourUsername = getState().user.username;
            const partnerUsername = message["receiver"] === ourUsername ? message["sender"] : message["receiver"];
            const messagePayload = {
                orgName: message["org_name"],
                partnerUsername,
                message,
            };
            dispatch(receivedPrivateMessage(messagePayload));
        }
    };

    const fetchChannelMessages = channelName => async (dispatch, getState) => {
        const orgName = getState().org.org.name;
        const [err, messages] = await to(messageService.fetchChannelMessages(orgName, channelName));
        if (err) {
            throw new Error("Could not fetch channel messages");
        }
        dispatch(setChannelMessages(orgName, channelName, messages));   
    };

    const fetchPrivateMessages = partnerUsername => async (dispatch, getState) => {
        const orgName = getState().org.org.name;
        const [err, messages] = await to(messageService.fetchPrivateMessages(orgName, partnerUsername));
        if (err) {
            throw new Error("Could not fetch private messages");
        }
        dispatch(setPrivateMessages(orgName, partnerUsername, messages));   
    };

    const channelMessagesSet = actionCreator(types.SET_CHANNEL_MESSAGES);
    const setChannelMessages = (orgName, channelName, messages) => dispatch => {
        dispatch(channelMessagesSet({orgName, channelName, messages}));
    };

    const privateMessagesSet = actionCreator(types.SET_PRIVATE_MESSAGES);
    const setPrivateMessages = (orgName, partnerUsername, messages) => dispatch => {
        dispatch(privateMessagesSet({orgName, partnerUsername, messages}));
    };
    
    const sendMessage = message => () => {
        socketService.send("send-message", message);
    };

    return { 
        messageReceived, 
        fetchChannelMessages, 
        fetchPrivateMessages,
        sendMessage,
    };
}

export default initActions;
