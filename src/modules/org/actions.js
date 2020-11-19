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
            orgsMap[org.name] = org;
        }
        dispatch(orgsFetch(orgsMap));
    };

    const orgSelect = actionCreator(types.SELECT_ORG);
    const selectOrg = (name) => (dispatch, getState) => {
        const orgs = getState().org.orgs;
        const org = orgs[name];
        // set channels
        const channels = org.channels;
        dispatch(actions.channel.setChannels(channels))
        // select default channel
        const channelsExist = channels && !utilityService.isEmpty(channels);
        if (channelsExist) {
            const defaultChannel = utilityService.getFirstProp(channels);
            dispatch(actions.sidebar.selectChannel(defaultChannel.channel_id));
        }
        // set members 
        const users = org.members;
        dispatch(actions.user.setUsers(users));
        dispatch(orgSelect(org));
    }

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
        selectOrg,
        showCreateOrgModal,
        setCreateOrgName,
        takenOrgName,
        setNewOrgUsers, 
    };
};

export default initActions;
