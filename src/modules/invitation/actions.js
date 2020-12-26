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
        if(invitations.length > 0){
            dispatch(actions.invitation.showPendingInvitationsModal(true));
            dispatch(invitationsFetch(invitations));
        }
        
    };
    const sendInvites = (orgName, invitedEmails) => async (dispatch) => {
        const [err, _] =  await to(invitationService.sendInvites(orgName, invitedEmails));
        if (err) throw new Error("Could not send org invitations")
    } 

    const modalInviteShow = actionCreator(types.SHOW_INVITE_MEMBERS_MODAL);
    const showInviteMembersModal = (show) => (dispatch) => {
        dispatch(modalInviteShow(show))
    };

    const modalInvitationsShow = actionCreator(types.SHOW_PENDING_INVITATIONS_MODAL);
    const showPendingInvitationsModal = (show) => (dispatch) => {
        dispatch(modalInvitationsShow(show))
    };

    const respondToInvitation = (invitation, isAccepted) => async dispatch => {
        const orgName = invitation.org_name;
        const [err, _] = await to(invitationService.respondToInvite(orgName, isAccepted));
        if (err) {
            throw new Error("Could not respond to invitation");
        }
        dispatch(removeInvitation(invitation));
    }

    const invitationRemove = actionCreator(types.REMOVE_INVITATION);
    const removeInvitation = (invitation) => (dispatch) => {
        dispatch(invitationRemove(invitation))
    };  

    return {
        fetchInvitations,
        sendInvites,
        showInviteMembersModal,
        showPendingInvitationsModal,
        respondToInvitation,
        removeInvitation,
    };
};

export default initActions;
