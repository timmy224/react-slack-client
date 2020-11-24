import types from "./types";
import { actions } from "../../context";
import { actionCreator } from "../utils";

const initActions = function() {
    const initializedActionCreator = actionCreator(types.INITIALIZED);
    const initMain = () => async (dispatch, getState) => {
        if (!getState().user.isLoginBundleFetched) {
            await dispatch(actions.user.fetchLoginBundle())
            dispatch(actions.org.selectDefaultOrg());
        }
        await dispatch(actions.chat.initChat());        
        dispatch(initializedActionCreator());
    };

    return { initMain };
};

export default initActions;