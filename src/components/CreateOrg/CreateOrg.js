import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../context";
import CustomModal from '../CustomModal/CustomModal';
import CustomButton from '../CustomButton/CustomButton';
import FormInput from '../FormInput/FormInput';
import CustomForm from '../CustomForm/CustomForm';

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

class CreateOrg extends Component {
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
        const form = 
            <CustomForm onSubmit={this.handleSubmit}>
                <FormInput type="text" name="newOrgName" placeholder="react_slack" onChange={this.handleOrgName} label="newOrgName">Enter Org Name</FormInput>
                <span>{userButton}</span>
                <FormInput type="text" name="newOrgName" placeholder="#enter users seperated by a space" onChange={this.handleUserChange} label="users">Users</FormInput>
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

export default connect(mapStateToProps, mapActionsToProps)(CreateOrg);


