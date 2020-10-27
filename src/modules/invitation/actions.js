import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (invitationService) {
	const invitationsFetch = actionCreator(types.FETCH_INVITATIONS);
    const fetchInvitations = () => async (dispatch) => {
        console.log('TRIGGERED')
        const [err, invitations] = await to(invitationService.fetchInvitations());
        if (err) {
            throw new Error("Could not fetch invitations");
        }
        if(invitations.length > 0){
            dispatch(actions.invitation.showInvitationsModal(true));
            dispatch(invitationsFetch(invitations));
        }
        
    };

    const modalInviteShow = actionCreator(types.SHOW_INVITE_MODAL);
    const showInviteModal = (show) => (dispatch) => {
        dispatch(modalInviteShow(show))
    };

    const modalInvitationsShow = actionCreator(types.SHOW_INVITATIONS_MODAL);
    const showInvitationsModal = (show) => (dispatch) => {
        dispatch(modalInvitationsShow(show))
    };

    const invitedUserEmailSet = actionCreator(types.SET_INVITED_USER_EMAIL);
    const setInvitedUserEmail = (email) => (dispatch) => {
        dispatch(invitedUserEmailSet(email))
    };

    const invitationsUpdate = actionCreator(types.UPDATE_INVITATIONS);
    const updateInvitations = (invites) => (dispatch) => {
        dispatch(invitationsUpdate(invites))
    };

    return {
    	fetchInvitations,
        showInviteModal,
        showInvitationsModal,
        setInvitedUserEmail,
        updateInvitations,
    };
};

export default initActions;
