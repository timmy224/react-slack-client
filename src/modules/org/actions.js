import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (orgService) {
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
