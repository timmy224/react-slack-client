import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
         messages:[]
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.MESSAGE_RECEIVED:
                return { ...state, messages:[...state.messages, payload]}                               
            default: 
                return state;
        }
    };

    return reducer;
};

export default initReducer;