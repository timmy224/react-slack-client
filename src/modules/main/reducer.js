import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        isInitialized: false,
    };

    const reducer = (state=INITIAL_STATE, action={}) => {
        const { type, payload } = action;
        switch (type) {
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