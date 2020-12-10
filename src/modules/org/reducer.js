import types from "./types";
import userTypes from "../user/types";
import set from "lodash/fp/set";

const initReducer = () => {
    const INITIAL_STATE = {
        orgs: {},
        org: null,
        showCreateOrgModal: false,
        createOrgName: '',
        showTakenMsg: false,
        newOrgUsers: [],
        showOrgSettingsModal: false,
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case userTypes.LOGOUT: 
                return INITIAL_STATE;
            case types.SET_ORGS:
                return {
                    ...state,
                    orgs: payload,
                };
            case types.SET_ORG: {
                const { orgName, org } = payload;
                const path = ["orgs", orgName]
                return set(path, org, state);
            }
            case types.SELECT_ORG:
                return {
                    ...state,
                    org: payload
                };
            case types.ADD_ORG_MEMBER: {
                const { orgName, orgMember } = payload;
                const path = ["orgs", orgName, "members"];
                const members = state.orgs[orgName]?.members ? {...state.orgs[orgName].members} : {};
                members[orgMember.username] = orgMember;
                return set(path, members, state);
            }
            case types.SET_ORG_MEMBER_ONLINE_STATUS: {
                const { orgName, username, isOnline } = payload;
                const orgMember = { username, logged_in: isOnline };
                const path = ["orgs", orgName, "members", username];
                return set(path, orgMember, state);
            }            
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
            case types.SHOW_ORG_SETTINGS_MODAL:
                return {
                    ...state,
                    showOrgSettingsModal: payload,
                }          
            default:
                return state;
        }
    };

    return reducer;
};

export default initReducer;
