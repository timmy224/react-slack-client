import { actions } from "../../context";

const initActions = function() {
    const initChat = () => async (dispatch, getState) => {
        const channel_id = getState().channel.channel_id;
        await dispatch(actions.message.fetchMessagesChannel(channel_id));
    };

    return { initChat };
};

export default initActions;