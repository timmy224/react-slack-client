import types from "./types";
import userTypes from "../user/types";

const initReducer = () => {
    const INITIAL_STATE = {
        showInviteMembersModal: false,
        showPendingInvitationsModal: false,
        pendingInvitations:[],
    };

  const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    
        switch (type) {
            case userTypes.LOGOUT: 
                return INITIAL_STATE;
            case types.SHOW_INVITE_MEMBERS_MODAL:
                return{
                    ...state,
                    showInviteMembersModal: payload,
                }
            case types.SHOW_PENDING_INVITATIONS_MODAL:
                return{
                    ...state,
                    showPendingInvitationsModal: payload,
                }
            case types.FETCH_INVITATIONS:
                return {
                    ...state,
                    pendingInvitations: payload,
                };
            case types.REMOVE_INVITATION:
                return{
                    ...state,
                    pendingInvitations: state.pendingInvitations.filter(invitation => invitation !== payload)
                }
            default: 
                return state;
        }
    };

  return reducer;
};

export default initReducer;
