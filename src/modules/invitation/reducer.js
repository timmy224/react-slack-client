import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        showInviteModal: false,
        showInvitationsModal: false,
        invitations:{},
        invitedUserEmail:'',
    };

  const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    
        switch (type) {
            case types.SHOW_INVITE_MODAL:
                return{
                    ...state,
                    showInviteModal: payload,
                }
            case types.SHOW_INVITATIONS_MODAL:
                return{
                    ...state,
                    showInvitationsModal: payload,
                }
            case types.FETCH_INVITATIONS:
                return {
                    ...state,
                    invitations: payload,
                };
            case types.SET_INVITED_USER_EMAIL:
                return {
                    ...state,
                    invitedUserEmail: payload,
                };
            default: 
                return state;
        }
    };

  return reducer;
};

export default initReducer;
