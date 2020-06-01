import types from "./types";
import { actionCreator } from "../utils";


const initActions = function () {
	const receivedMessage = actionCreator(types.MESSAGE_RECEIVED)
    const messageReceived = (message)=> (dispatch)=>{
    	dispatch(receivedMessage(message))
    }
    return {messageReceived};
};

export default initActions;




