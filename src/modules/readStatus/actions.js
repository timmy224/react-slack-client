import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (readStatusService, dateTimeService) {
    const MESSAGE_DT_FORMAT = "YYYY/MM/DD HH:mm:ss:SSS";
    const systemDateTime = dateTimeService.str(dateTimeService.now(), MESSAGE_DT_FORMAT);
    
    // setting read statuses client-side 
    const readStatusSetChannel = actionCreator(types.READ_STATUS_SET_CHANNEL);
    const setReadStatusChannel = (channel, dateTime) => dispatch => {
        dispatch(readStatusSetChannel(channel, dateTime));
    }

    const readStatusSetPrivate= actionCreator(types.READ_STATUS_SET_PRIVATE);
    const setReadStatusPrivate = (partnerUsername, dateTime) => dispatch => {
        dispatch(readStatusSetPrivate(partnerUsername, dateTime));
    }

    // status wrapper for fetching upon login
    const fetchStatuses = () => async dispatch => {
        const [err, readStatuses] = await to(readStatusService.fetchReadStatuses());
        // NOTE: Add errors on server-side
        if (err) {
            throw new Error("Could not fetch read statuses");
        }
        // iterate through read_status['channel_statuses'] and set client state
        for (const channelStatus in readStatuses['channel_statuses']) {
            for (const [channelName, readDateTime] in Object.entries(channelStatus)) {
                dispatch(setReadStatusChannel(channelName, readDateTime));
            }
        }
        // iterate through read_status['private_statuses'] and set client state
        for (const privateStatus in readStatuses['private_statuses']) {
            for (const [partnerUsername, readDateTime] in Object.entries(privateStatus)) {
                dispatch(setReadStatusPrivate(partnerUsername, readDateTime));
            }  
        }
    };

    // sending read status to server-side
    const sendReadStatus = readStatus => () => {
        socketService.send("send-message", readStatus);
    };
    
    return { 
        setReadStatusChannel,
        setReadStatusPrivate,
        fetchStatuses,
        sendReadStatus,
    };
};

export default initActions;




