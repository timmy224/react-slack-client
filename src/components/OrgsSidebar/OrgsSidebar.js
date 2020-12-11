import React, { Component } from "react";
import { actions, services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";
import "./OrgsSidebar.css";
import OrgSettingsModal from "../OrgSettingsModal/OrgSettingsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import PendingInvitationsModal from "../PendingInvitationsModal/PendingInvitationsModal";
import CreateOrgModal from "../CreateOrgModal/CreateOrgModal";
import InviteMembersModal from "../InviteMembersModal/InviteMembersModal";

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
    showPendingInvitationsModal: actions.invitation.showPendingInvitationsModal,
};

class OrgsSidebar extends Component {
    selectOrg = name => {
        this.props.selectOrg(name);
    }

    render() {
        const { orgs, currentOrg, invitations, showOrgSettingsModal } = this.props;
        const isOrgsEmpty = services.utilityService.isEmpty(orgs);
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
                    <div id="org-settings">
                        <div className={`${invitations.length ? 'alert-pending' : ''}`}></div>
                        <button onClick={() => showOrgSettingsModal(true)}>
                            <FontAwesomeIcon icon={faCog} transform="grow-4" color="#99a59e" />
                        </button>
                    </div>
                    <OrgSettingsModal />
                    <PendingInvitationsModal />
                    <CreateOrgModal />
                    <InviteMembersModal />
                </div>
            </div>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrgsSidebar);