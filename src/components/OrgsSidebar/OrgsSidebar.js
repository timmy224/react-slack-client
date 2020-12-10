import React, { Component } from "react";
import { actions, services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";
import "./OrgsSidebar.css";
import PendingInvitationsModal from "../PendingInvitationsModal/PendingInvitationsModal";
import OrgSettingsModal from "../OrgSettingsModal/OrgSettingsModal";
const mapStateToProps = (state) => {
    return {
        currentOrg: state.org.org,
        orgs: state.org.orgs,
        invitations: state.invitation.pendingInvitations,
    };
}

const mapActionsToProps = {
    selectOrg: actions.org.selectOrg,
    showOrgSettingsModal: actions.org.showOrgSettingsModal,
    showPendingInvitationsModal: actions.invitation.showInvitationsModal,
};

class OrgsSidebar extends Component {
    selectOrg = name => {
        this.props.selectOrg(name);
    }

    render() {
        const { orgs, currentOrg, showCreateOrgModal, invitations, showPendingInvitationsModal, showOrgSettingsModal } = this.props;
        const isOrgsEmpty = services.utilityService.isEmpty(orgs);
        const orgsDisplay = !isOrgsEmpty ?
            (Object.keys(orgs).map(orgName => {
                const isSelected = orgName === currentOrg?.name;
                return <Org name={orgName} key={orgName} className={isSelected ? "selected-org" : ""} onClickHandler={this.selectOrg} />;
            })) : null;
        
        const orgInvitesButton = invitations.length ?
            <div id="org-invites">
                <button onClick={() => showPendingInvitationsModal(true)}>{invitations.length}</button>
            </div> : null;
        return (
            <div id="orgs">
                <h1 id="orgs-header">Orgs</h1>
                <div id="orgs-btns">
                    {orgInvitesButton}
                    {orgsDisplay}
                    <div id="org-settings">
                        <button onClick={() => showOrgSettingsModal(true)}>+</button>
                    </div>
                    <OrgSettingsModal />
                    <PendingInvitationsModal />
                </div>
            </div>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrgsSidebar);