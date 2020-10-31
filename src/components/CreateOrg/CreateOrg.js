import React, { Component } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { actions } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state) => {
    return {
        createOrgName: state.org.createOrgName,
        showTakenNameMsg: state.org.showTakenNameMsg,
        showCreateOrgModal: state.org.showCreateOrgModal,
        username: state.user.username,
        newOrgUsers: state.org.newOrgUsers,
    }
}
const mapActionsToProps = {
    setCreateOrgName: actions.org.setCreateOrgName,
    takenOrgName: actions.org.takenOrgName,
    handleShowCreateOrgModal: actions.org.showCreateOrgModal,
    setNewOrgUsers: actions.org.setNewOrgUsers,

}

class CreateOrg extends Component {
    handleSubmit = (event) => {
        const { createOrgName, takenOrgName, username, newOrgUsers } = this.props
        event.preventDefault();
        const orgInfo = {
            org_name : createOrgName,
            invited_members: newOrgUsers,
            action: "STORE",
        }
        services.orgService.createOrg(orgInfo)
            .then(response => {
                if (response.successful) {
                    this.handleHide()
                } else {
                    takenOrgName(true)
                }
            })
    }

    resetModal = () => {
        const { setNewOrgUsers, takenOrgName, setCreateOrgName } = this.props
        setCreateOrgName('')
        setNewOrgUsers([]);
        takenOrgName(false);
    }

    handleOrgName = (event) => {
        let newOrgName = event.target.value;
        return this.props.setCreateOrgName(newOrgName)
    }

    handleHide = () => {
        const { handleShowCreateOrgModal } = this.props
        handleShowCreateOrgModal(false);
        this.resetModal();
    }
    handleUserChange = (event) => {
        let users = event.target.value;
        return this.props.setNewOrgUsers(users.trim().split(/[\s,]+/))
    }

    render() {
        const { newOrgUsers, showCreateOrgModal } = this.props
        const userButton = newOrgUsers.map(user => <button type="button" value={user} key={user}>{user}</button>)
        return (
            <div>
                <Modal show={showCreateOrgModal} onHide={this.handleHide} className="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new Org</Modal.Title>
                    </Modal.Header>
                    <form
                    className="custom-form"
                    onSubmit={this.handleSubmit}>
                        <label htmlFor='newOrgName'>Enter Org Name</label>
                        <input name="newOrgName" type="text" placeholder="react_slack" onChange={this.handleOrgName} className="form-control"/>
                        {userButton}
                        <label htmlFor="users" >Users</label>
                        <input name="users" type="text" placeholder="#enter users seperated by a space" onChange={this.handleUserChange} className="form-control"/>
                        <button type='submit' onClick={this.handleSubmit} className="mt-2 btn btn-primary custom-button">Submit</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateOrg);


