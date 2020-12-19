import React, { Component } from "react";
import { actions, services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";

import styles from "./OrgsSidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import PendingInvitationsModal from "../Modals//PendingInvitationsModal/PendingInvitationsModal";
import CreateOrgModal from "../Modals/CreateOrgModal/CreateOrgModal";

const mapStateToProps = (state) => {
    return {
        currentOrg: state.org.org,
        orgs: state.org.orgs,
        invitations: state.invitation.pendingInvitations,
    };
}

const mapActionsToProps = {
    selectOrg: actions.org.selectOrg,
    handleCreateOrgModal: actions.org.showCreateOrgModal,
    handlePendingInvitationsModal: actions.invitation.showPendingInvitationsModal,
};

class OrgsSidebar extends Component {
    selectOrg = name => {
        this.props.selectOrg(name);
    }

    render() {
        const { orgSettings, pendingInvitations, alertPending, orgsSidebar, orgsHeader, orgsBtns } = styles
        const { orgs, currentOrg, invitations, handleCreateOrgModal, handlePendingInvitationsModal } = this.props;
        const isOrgsEmpty = services.utilityService.isEmpty(orgs);
        const viewInvitationsBtn = invitations.length ? 
                <div className={`${orgSettings} ${pendingInvitations}`}>
                    <div className={alertPending}>{invitations.length}</div>
                    <button onClick={() => handlePendingInvitationsModal(true)}>
                        <FontAwesomeIcon icon={faUsers} transform="grow-4" color="#99a59e" />
                    </button>
                </div>
                : null;
        const orgsDisplay = !isOrgsEmpty ?
            (Object.keys(orgs).map(orgName => {
                const isSelected = orgName === currentOrg?.name;
                return <Org name={orgName} key={orgName} className={isSelected ? "selectedOrg" : ""} onClickHandler={this.selectOrg} />;
            })) : null;
        return (
            <div className={orgsSidebar}>
                <h1 className={orgsHeader}>Orgs</h1>
                <div className={orgsBtns}>
                    {orgsDisplay}
                    <div className={orgSettings}>
                            <button onClick={() => handleCreateOrgModal(true)}>
                                <FontAwesomeIcon icon={faPlus} transform="grow-4" color="#99a59e" />
                            </button>
                    </div>
                    {viewInvitationsBtn}
                    <PendingInvitationsModal />
                    <CreateOrgModal />
                </div>
            </div>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrgsSidebar);