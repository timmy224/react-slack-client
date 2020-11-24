import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        username: '',
        users: {},
        showTakenMsg: false,
        showMissingCred: false,
        wrongCredentialsMsg: false,
        isLoginBundleFetched: false,
        password: '',
    };

    const reducer = (state=INITIAL_STATE, action={}) => {
        const { type, payload } = action;
        switch (type) {
            case types.SET_USERNAME:
                return {
                    ...state, 
                    username: payload
                }; 
            case types.TAKEN_USERNAME:
                return {
                    ...state, 
                    showTakenMsg: payload
                };
            case types.SET_USERS:
                return {
                    ...state,
                    users: payload
                };
            case types.UPDATE_USERS:
                return {
                    ...state,
                    users: {
                        ...state.users,
                        [payload.username]: payload,
                    }
                };
            case types.SET_PASSWORD:
                return {
                    ...state,
                    password: payload
                }
            case types.MISSING_CREDENTIALS:
                return {
                    ...state,
                    showMissingCred: payload
                }
            case types.INCORRECT_CREDENTIALS:
                return {
                    ...state, 
                    wrongCredentialsMsg: payload
                };
            case types.LOGIN:
                return {
                    ...state,
                    password: ""
                };
            case types.FETCH_LOGIN_BUNDLE:
                return {
                    ...state,
                    isLoginBundleFetched: true
                };
            case types.LOGOUT:
                return {
                    ...state,
                    username: ""
                };
            default:
                return state;
        }
    };
    return reducer;
};

export default initReducer;

