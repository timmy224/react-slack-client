import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        messages:[],
        enteredInput: '',
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.MESSAGE_RECEIVED:
                return { 
                        ...state,
                         messages: [...state.messages, payload]}      
            case types.INPUT_ENTER:
                return {
                    ...state,
                    enteredInput: payload,
                }
            case types.CLEAR_INPUT:
                return {
                    
                }
            default: 
                return state;
        }
    };

    return reducer;
};

export default initReducer;