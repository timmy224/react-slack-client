import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (orgService, utilityService) {
    const orgsFetch = actionCreator(types.FETCH_ORGS);
    const fetchOrgs = () => async (dispatch) => {
        const [err, orgs] = await to(orgService.fetchOrgs());
        if (err) {
            throw new Error("Could not fetch orgs");
        }
        const orgsMap = {};
        for (let org of orgs) {
            orgsMap[org.org_id] = org;
        }
        dispatch(orgsFetch(orgsMap));
    };


    const modalCreateOrgShow = actionCreator(types.SHOW_CREATE_ORG_MODAL);
    const showCreateOrgModal = (show) => (dispatch) => {
        dispatch(modalCreateOrgShow(show))
    };

    const createOrgNameSet = actionCreator(types.SET_CREATE_ORG_NAME);
    const setCreateOrgName = (orgName) => (dispatch) => {
        dispatch(createOrgNameSet(orgName))
    };

    const orgNameTaken = actionCreator(types.ORG_NAME_TAKEN);
    const takenOrgName = (isOrgNameTaken) => (dispatch) => {
        dispatch(orgNameTaken(isOrgNameTaken))
    };

    const newOrgUserSet = actionCreator(types.SET_NEW_ORG_USERS);
    const setNewOrgUsers = (newOrgUsers) => (dispatch) => {
        dispatch(newOrgUserSet(newOrgUsers))
    };

    return {
        fetchOrgs,
        showCreateOrgModal,
        setCreateOrgName,
        takenOrgName,
        setNewOrgUsers,
    };
};

export default initActions;


/* 
 const orgSelect = actionCreator(types.ORG_SELECT);
    const selectOrg = orgId => (dispatch, getState) => {
        const orgs = getState().org.orgs;
        const org = orgs[orgId];
        dispatch(orgSelect(org));
        dispatch(actions.main.initMain(orgId))
    };

    const orgDeleted = (orgId) => async (dispatch, getState) => {
        const isCurrentOrgDeleted = getState().main.type === "org" && getState().main.org.org_id === parseInt(orgId);
        await dispatch(fetchOrgs());
        if (isCurrentOrgDeleted) {
            const orgs = getState().org.orgs;
            const orgsExist = orgs && !utilityService.isEmpty(orgs);
            if (orgsExist) {
                const defaultOrg = utilityService.getFirstProp(orgs);
                dispatch(actions.org.selectOrg(defaultOrg.org_id));
            }
        }
    };

//CHANNELS FLOW
main.initMain 
        => user.fetchLoginBundle 
                => channel.fetchChannels => channelService.fetchChannels => state.channels
                => user.fetchUsernames => userService.fetchUsernames => state.usernames
                => permission.fetchPermissions => permissionService.fetchPermissions 
                                                                    => state.orgMnberPerms
                                                                    => state.channelMemberPerms
                => invitation.fetchInvitations => invitationService.fetchInvitations => state.invitations
                => org.fetchOrgs => orgService.fetchOrgs => state.orgs
        => chat.initChat 
                => message.initChannelMessagesMap
                => message.initPrivateMessagesMap
                => setDefaultChannel(state.channels.firstProp)
                => sidebar.selectChannel
                    => channel.fetchNumMembers
                    => message.fetchChannelMessages => messageService.fetchChannelMessages => state.channelMessages
                    => message.fetchPrivateMessages => messageService.fetchPrivateMessages => state.privateMessages
        => setDefaultOrg(state.channels.firstProp)
                => **On new org selected**
                => channel.fetchChannels(org_id)
                => user.fetchUsername(org_id)
                => permission.fetchPermissions(org_id)

1. get initial org routes set up
    a. fetchOrgs
    b. createOrg
2. handle org deleted
    => look at how channel deleted is handled
3. set up org sidebar
    => on new org selected run actions akin to original side
    a. run main.initMain(org_id)
4. refactor routes to include org_id in order to get appropriate data
    a. fetchChannels
    b. fetchUsernames
    c. fetchPermissions
    d. fetchMessages
5. initActions
    a. setDefaultChannel
    b. createDefaulChannel
*/
