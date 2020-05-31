import types from "./types";


const initActions = function () {
	
    const messageReceived = (message)=> (dispatch)=>{
    	dispatch({type:types.MESSAGE_RECEIVED, payload:message})
    }
    return {messageReceived};
};

export default initActions;




