import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        orgs: {},
        showCreateOrgModal: false,
        createOrgName: '',
        showTakenMsg: false,
        newOrgUsers: [],
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.FETCH_ORGS:
                return {
                    ...state,
                    orgs: payload,
                };
            case types.SHOW_CREATE_ORG_MODAL:
                return {
                    ...state,
                    showCreateOrgModal: payload,
                }
            case types.SET_CREATE_ORG_NAME:
                return {
                    ...state,
                    createOrgName: payload,
                }
            case types.ORG_NAME_TAKEN:
                return {
                    ...state,
                    showTakenMsg: payload,
                }
            case types.SET_NEW_ORG_USERS:
                return {
                    ...state,
                    newOrgUsers: payload,
                }
            default:
                return state;
        }
    };

    return reducer;
};

export default initReducer;
