import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (utilityService) {
    const inputUpdated = actionCreator(types.INPUT_UPDATED);
    const updateInput = (input) => (dispatch) => {
        dispatch(inputUpdated(input));
    };

    const clearInput = actionCreator(types.CLEAR_INPUT);
    const inputClear = () => (dispatch) => {
        dispatch(clearInput());
    };

    return { updateInput, inputClear };
};

export default initActions;




