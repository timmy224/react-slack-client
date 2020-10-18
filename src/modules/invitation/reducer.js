
import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        showInviteModal: false,
    };

  const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    
        switch (type) {
            case types.SHOW_INVITE_MODAL:
                return{
                    ...state,
                    showInviteModal: payload,
                }
            default: 
                return state;
        }
    };

  return reducer;
};

export default initReducer;
