import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../../context";
import CustomModal from '../../UI/CustomModal/CustomModal';
import CustomButton from '../../UI/CustomButton/CustomButton';
import CustomFormInput from '../../UI/CustomFormInput/CustomFormInput';
import CustomForm from '../../UI/CustomForm/CustomForm';

import styles from '../CreateChannelModal/CreateChannelModal.module.css'

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
    createOrg: actions.org.createOrg,
    setCreateOrgName: actions.org.setCreateOrgName,
    takenOrgName: actions.org.takenOrgName,
    handleShowCreateOrgModal: actions.org.showCreateOrgModal,
    setNewOrgUsers: actions.org.setNewOrgUsers,
}

class CreateOrgModal extends Component {
    handleSubmit = (event) => {
        const { createOrgName, takenOrgName, newOrgUsers, createOrg } = this.props
        event.preventDefault();
        createOrg(createOrgName, newOrgUsers)
            .then(response => {
                if (response.successful) {
                    this.handleHide()
                } else {
                    takenOrgName(true)
                } 
            });
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
        const { handleShowCreateOrgModal} = this.props
        handleShowCreateOrgModal(false);
        this.resetModal();
    }
    handleUserChange = (event) => {
        let users = event.target.value;
        return this.props.setNewOrgUsers(users.trim().split(/[\s,]+/))
    }

    render() {
        const { newOrgUsers, showCreateOrgModal } = this.props
        const usernamesDisplay = newOrgUsers.map(user => <span className={styles.usernameDisplay}>{user}</span>)
        const form = 
            <CustomForm onSubmit={this.handleSubmit}>
                <CustomFormInput type="text" name="newOrgName" placeholder="react_slack" onChange={this.handleOrgName} label="newOrgName">Enter Org Name</CustomFormInput>
                    {usernamesDisplay}
                <CustomFormInput type="text" name="newOrgName" placeholder="#enter users seperated by a space" onChange={this.handleUserChange} label="users">Users</CustomFormInput>
                <CustomButton type='submit' onClick={this.handleSubmit}>Submit</CustomButton>
            </CustomForm>
        return (
            <CustomModal 
                show={showCreateOrgModal} 
                onHide={this.handleHide}
                title="Create a new Org"
                form={form}
                />
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateOrgModal
    );


