import React, { Component } from "react";
import { actions, services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";
import "./OrgsSidebar.css";
import CreateOrg from "../CreateOrg/CreateOrg";
import InvitationsModal from "../InvitationsModal/InvitationsModal";

const mapStateToProps = (state) => {
    return {
        currentOrg: state.org.org,
        orgs: state.org.orgs,
        invitations: state.invitation.pendingInvitations,
    };
}

const mapActionsToProps = {
    selectOrg: actions.org.selectOrg,
    showCreateOrgModal: actions.org.showCreateOrgModal,
    showPendingInvitationsModal: actions.invitation.showInvitationsModal,
};

class OrgsSidebar extends Component {
    selectOrg = name => {
        this.props.selectOrg(name);
    }

    render() {
        const { orgs, currentOrg, showCreateOrgModal, invitations, showPendingInvitationsModal} = this.props;
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
                <h2 id="orgs-label">Orgs</h2>
                {orgInvitesButton}
                {orgsDisplay}
                <div id="new-org">
                    <button onClick={() => showCreateOrgModal(true)}>+</button>
                </div>
                <CreateOrg />
                <InvitationsModal />
            </div>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrgsSidebar);