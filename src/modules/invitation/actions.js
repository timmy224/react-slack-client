
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function () {

    const modalInviteShow = actionCreator(types.SHOW_INVITE_MODAL);
    const showInviteModal = (show) => (dispatch) => {
        dispatch(modalInviteShow(show))
    };

    return {
        showInviteModal,
    };
};

export default initActions;
