import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function () {
    const initChat = () => (dispatch, getState) => {
        // Doesn't do anything atm
    };

    const inputUpdated = actionCreator(types.INPUT_UPDATED);
    const updateInput = (input) => (dispatch) => {
        console.log("Input being updated through reux action")
        dispatch(inputUpdated(input));
    };

    const clearInput = actionCreator(types.CLEAR_INPUT);
    const inputClear = () => (dispatch) => {
        dispatch(clearInput());
    };

    return { initChat, updateInput, inputClear };
};

export default initActions;




