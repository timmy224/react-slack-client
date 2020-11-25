import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (orgService, utilityService) {
    const orgsFetch = actionCreator(types.FETCH_ORGS);
    const fetchOrgs = () => async (dispatch) => {
        let [err, orgs] = await to(orgService.fetchOrgs());
        if (err) {
            throw new Error("Could not fetch orgs");
        }
        orgs = Object.fromEntries(orgs.map(org => [org.name, org]));
        dispatch(setOrgs(orgs));
    };

    const orgsSet = actionCreator(types.SET_ORGS);
    const setOrgs = orgs => (dispatch) => {
        dispatch(orgsSet(orgs));
    }

    const orgSelect = actionCreator(types.SELECT_ORG);
    const selectOrg = orgName => (dispatch, getState) => {
        const org = getState().org.orgs[orgName];
        dispatch(orgSelect(org));
        // set channels
        const channels = org.channels;
        dispatch(actions.channel.setOrgChannels(orgName, channels));
        // select default channel
        dispatch(actions.sidebar.selectDefaultChannel());
        // set members 
        const orgMembers = org.members;
        const usernames = orgMembers.map(member => member.username);
        dispatch(actions.user.setUsernames(usernames));
    }

    const selectDefaultOrg = () => (dispatch, getState) => {
        const orgs = getState().org.orgs;
        const orgsExist = orgs && !utilityService.isEmpty(orgs);
        if (orgsExist) {
            const defaultOrg = utilityService.getFirstProp(orgs);
            dispatch(selectOrg(defaultOrg.name));
        }
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
        setOrgs,
        selectOrg,
        selectDefaultOrg,
        showCreateOrgModal,
        setCreateOrgName,
        takenOrgName,
        setNewOrgUsers,
    };
};

export default initActions;
