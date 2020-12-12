import React, { Component } from "react";
import { actions, services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";
import "./OrgsSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import PendingInvitationsModal from "../PendingInvitationsModal/PendingInvitationsModal";
import CreateOrgModal from "../CreateOrgModal/CreateOrgModal";

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
        const { orgs, currentOrg, invitations, handleCreateOrgModal, handlePendingInvitationsModal } = this.props;
        const isOrgsEmpty = services.utilityService.isEmpty(orgs);
        const alertPendingInvitations = invitations.length ? 
                <div className="org-settings">
                    <div className="alert-pending">{invitations.length}</div>
                    <button onClick={() => handlePendingInvitationsModal(true)}>
                        <FontAwesomeIcon icon={faUsers} transform="grow-4" color="#99a59e" />
                    </button>
                </div>
                : null;
        const orgsDisplay = !isOrgsEmpty ?
            (Object.keys(orgs).map(orgName => {
                const isSelected = orgName === currentOrg?.name;
                return <Org name={orgName} key={orgName} className={isSelected ? "selected-org" : ""} onClickHandler={this.selectOrg} />;
            })) : null;
        return (
            <div id="orgs">
                <h1 id="orgs-header">Orgs</h1>
                <div id="orgs-btns">
                    {orgsDisplay}
                    <div className="org-settings">
                            <button onClick={() => handleCreateOrgModal(true)}>
                                <FontAwesomeIcon icon={faPlus} transform="grow-4" color="#99a59e" />
                            </button>
                    </div>
                    <div className="org-settings pending-invitations">
                        {alertPendingInvitations}
                    </div>
                    <PendingInvitationsModal />
                    <CreateOrgModal />
                </div>
            </div>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrgsSidebar);