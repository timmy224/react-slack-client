import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function () {
    const initChat = () => async (dispatch, getState) => {
        const channelId = getState().chat.channelId;
        if (channelId !== null) {
            dispatch(actions.message.fetchChannelMessages(channelId));
        }
    };

    const inputUpdated = actionCreator(types.INPUT_UPDATED);
    const updateInput = (input) => (dispatch) => {
        dispatch(inputUpdated(input));
    };

    const clearInput = actionCreator(types.CLEAR_INPUT);
    const inputClear = () => (dispatch) => {
        dispatch(clearInput());
    };

    return { initChat, updateInput, inputClear };
};

export default initActions;




