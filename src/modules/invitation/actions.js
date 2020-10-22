import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (invitationService) {
	const invitationsFetch = actionCreator(types.FETCH_INVITATIONS);
    const fetchInvitations = () => async (dispatch) => {
        const [err, invitations] = await to(invitationService.fetchInvitations());
        if (err) {
            throw new Error("Could not fetch invitations");
        }
        // console.log('INVITATIONS:', invitations)
        if(invitations.length > 0){
            const invitationsMap = {};
            for (let invitation of invitations) {
                invitationsMap[invitation.orgName] = invitation;
            }
            dispatch(actions.invitation.showInviteModal(true));
            dispatch(invitationsFetch(invitationsMap));
        }
        
    };

    const modalInviteShow = actionCreator(types.SHOW_INVITE_MODAL);
    const showInviteModal = (show) => (dispatch) => {
        dispatch(modalInviteShow(show))
    };

    return {
    	fetchInvitations,
        showInviteModal,
    };
};

export default initActions;
