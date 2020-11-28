import types from "./types";
import userTypes from "../user/types";

const initReducer = () => {
    const INITIAL_STATE = {
        isInitialized: false,
    };

    const reducer = (state=INITIAL_STATE, action={}) => {
        const { type, payload } = action;
        switch (type) {
            case userTypes.LOGOUT: 
                return INITIAL_STATE;
            case types.INITIALIZED: 
                return {
                    ...state,
                    isInitialized: true
                };
            default:
                return state;
        }
    };
    return reducer;
};

export default initReducer;