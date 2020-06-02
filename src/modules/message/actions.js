import types from "./types";
import { actionCreator } from "../utils";


const initActions = function () {
    
    const receivedMessage = actionCreator(types.MESSAGE_RECEIVED)
    
    const messageReceived = (message)=> (dispatch)=>{
    	dispatch(receivedMessage(message))
    };

    const inputEnter = actionCreator(types.INPUT_ENTER)

    const enterInput = (input) => (dispatch) => {
        dispatch(inputEnter(input))
    })

    const clearInput = actionCreator(types.CLEAR_INPUT)

    const clearAfterInput = (dispatch) => {
        dispatch(clearInput);
    }

    return {messageReceived, enterInput, clearAfterInput};
};

export default initActions;




