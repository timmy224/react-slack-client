import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        username: '',
        isLoginBundleFetched: false,
    };

    const reducer = (state=INITIAL_STATE, action={}) => {
        const { type, payload } = action;
        switch (type) {
            case types.SET_USERNAME:
                return {
                    ...state, 
                    username: payload
                }; 
            case types.FETCH_LOGIN_BUNDLE:
                return {
                    ...state,
                    isLoginBundleFetched: true
                };
            case types.LOGOUT:
                return INITIAL_STATE;
            default:
                return state;
        }
    };
    return reducer;
};

export default initReducer;

