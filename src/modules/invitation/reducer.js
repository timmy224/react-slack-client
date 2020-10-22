import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        showInviteModal: false,
        invitations:{},
    };

  const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    
        switch (type) {
            case types.SHOW_INVITE_MODAL:
                return{
                    ...state,
                    showInviteModal: payload,
                }
            case types.FETCH_INVITATIONS:
                return {
                    ...state,
                    invitations: payload,
                };
            default: 
                return state;
        }
    };

  return reducer;
};

export default initReducer;
