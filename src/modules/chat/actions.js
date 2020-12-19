import types from "./types";
import { actionCreator } from "../utils";

const initActions = function () {
    const channelSet = actionCreator(types.SET_CHANNEL);
    const setChannel = channel => dispatch => {
        dispatch(channelSet(channel));
    }

    const inputUpdated = actionCreator(types.INPUT_UPDATED);
    const updateInput = (input) => (dispatch) => {
        dispatch(inputUpdated(input));
    };

    const clearInput = actionCreator(types.CLEAR_INPUT);
    const inputClear = () => (dispatch) => {
        dispatch(clearInput());
    };

    const resetActionCreator = actionCreator(types.RESET);
    const reset = () => dispatch => {
        dispatch(resetActionCreator());
    }

    return { setChannel, updateInput, inputClear, reset };
};

export default initActions;




