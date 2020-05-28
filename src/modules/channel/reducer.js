import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        list: [],
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.FETCH_CHANNELS_SUCCESS:
                return {
                    ...state,
                    list: payload,
                };                                
            default: 
                return state;
        }
    };

    return reducer;
};

export default initReducer;