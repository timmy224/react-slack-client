import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";
import { cloneDeep } from "lodash-es";

const initActions = function (orgService, utilityService) {
    const createOrg = (orgName, invitedEmails) => (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const [err, response] = await to(orgService.createOrg(orgName, invitedEmails));
            if (err) {
                throw new Error("Could not create org");
            }
            if (response.successful) {
                await dispatch(fetchOrg(orgName));
                dispatch(selectOrg(orgName));
            }
            resolve(response);
        });
    };

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

    const fetchOrg = orgName => async dispatch => {
        const [err, org] = await to(orgService.fetchOrg(orgName));
        if (err) {
            throw new Error("Could not fetch org");
        }
        dispatch(setOrg(org.name, org));
    }

    const orgSet = actionCreator(types.SET_ORG);
    const setOrg = (orgName, org) => dispatch => {
        dispatch(orgSet({ orgName, org }));
    }

    const setCurrentOrg = actionCreator(types.SET_CURRENT_ORG);
    const selectOrg = orgName => async (dispatch, getState) => {
        let org = getState().org.orgs[orgName];
        if (!org) {
            await dispatch(fetchOrg(orgName));
            org = getState().org.orgs[orgName];
        }
        dispatch(setCurrentOrg(org));
        // fetch channels and select default channel
        await dispatch(actions.channel.fetchChannels(orgName));
        dispatch(actions.sidebar.selectDefaultChannel());
    }

    const selectDefaultOrg = () => (dispatch, getState) => {
        const orgs = getState().org.orgs;
        const orgsExist = orgs && !utilityService.isEmpty(orgs);
        if (orgsExist) {
            const defaultOrg = utilityService.getFirstProp(orgs);
            dispatch(selectOrg(defaultOrg.name));
        }
    };

    const addedToOrg = orgName => async (dispatch, getState) => {
        const orgs = getState().org.orgs;
        const otherOrgsExist = Object.keys(orgs).length > 0;
        if (otherOrgsExist) {
            dispatch(setOrg(orgName));
        } else {
            dispatch(selectOrg(orgName));
        }
    }

    const orgMemberAdd = actionCreator(types.ADD_ORG_MEMBER);
    const addOrgMember = (orgName, orgMember) => dispatch => {
        dispatch(orgMemberAdd({ orgName, orgMember }));
    }

    const orgmemberSetOnlineStatus = actionCreator(types.SET_ORG_MEMBER_ONLINE_STATUS);
    const setOrgMemberOnlineStatus = (orgName, username, isOnline) => dispatch => {
        dispatch(orgmemberSetOnlineStatus({ orgName, username, isOnline }));
    };

    const modalCreateOrgShow = actionCreator(types.SHOW_CREATE_ORG_MODAL);
    const showCreateOrgModal = (show) => (dispatch) => {
        dispatch(modalCreateOrgShow(show))
    };

    const orgSettingsModalShow = actionCreator(types.SHOW_ORG_SETTINGS_MODAL);
    const showOrgSettingsModal = (show) => (dispatch) => {
        dispatch(orgSettingsModalShow(show))
    };

    const deleteOrg = orgName => async () => {
        const [err, _] = await to(orgService.deleteOrg(orgName));
        if (err) {
            throw new Error("Could not delete org");
        }
    }

    const handleOrgDeleted = (orgName) => (dispatch, getState) => {
    const isCurrentOrgDeleted = getState().org.org?.name === orgName;
    dispatch(removeOrg(orgName));
        if (isCurrentOrgDeleted) {
            dispatch(setCurrentOrg(null));
            dispatch(selectDefaultOrg());
        }
    };

    const removeOrg = orgName => (dispatch, getState) => {
        const allOrgs = getState().org.orgs
        const orgs = cloneDeep(allOrgs);
        delete orgs[orgName]
        dispatch(setOrgs(orgs));
    }


    return {
        createOrg,
        fetchOrgs,
        setOrgs,
        fetchOrg,
        selectOrg,
        selectDefaultOrg,
        addedToOrg,
        addOrgMember,
        setOrgMemberOnlineStatus,
        showCreateOrgModal,
        showOrgSettingsModal,
        deleteOrg,
        handleOrgDeleted,
        removeOrg,
    };
};

export default initActions;
