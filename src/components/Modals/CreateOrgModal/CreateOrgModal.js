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
        // createOrgName: state.org.createOrgName,
        // showTakenNameMsg: state.org.showTakenNameMsg,
        showCreateOrgModal: state.org.showCreateOrgModal,
        username: state.user.username,
        // newOrgUsers: state.org.newOrgUsers,
    }
}
const mapActionsToProps = {
    createOrg: actions.org.createOrg,
    // setCreateOrgName: actions.org.setCreateOrgName,
    // takenOrgName: actions.org.takenOrgName,
    handleShowCreateOrgModal: actions.org.showCreateOrgModal,
    // setNewOrgUsers: actions.org.setNewOrgUsers,
}

class CreateOrgModal extends Component {
    constructor(){
        super();
        this.state={
            orgName: '',
            takenOrgName: false, 
            setOrgUsers: '',
            orgUsers:[],
        }
    }

    handleOrgName = event => {
        const { value, name } = event.target;
        this.setState({[name]: value})
    }

    handleUserChange = event => {
        const { value, name } = event.target;
        let users = value.trim().split(/[\s,]+/)
        this.setState({
            [name]: value,
            orgUsers: users,
        })
    }

    resetModal = () => {
        this.setState({
            orgName: '',
            takenOrgName: false, 
            setOrgUsers: '',
            orgUsers:[],
        })
    }

    handleHide = () => {
        const { handleShowCreateOrgModal} = this.props
        handleShowCreateOrgModal(false);
        this.resetModal();
    }

    handleSubmit = event => {
        const { createOrg } = this.props;
        const { orgName, takenOrgName, orgUsers } = this.state;
        event.preventDefault();
        createOrg(orgName, orgUsers)
            .then(response => {
                if (response.successful) {
                    this.handleHide()
                } else {
                    takenOrgName(true)
                } 
            });
    }

    // resetModal = () => {
    //     const { setNewOrgUsers, takenOrgName, setCreateOrgName } = this.props
    //     setCreateOrgName('')
    //     setNewOrgUsers([]);
    //     takenOrgName(false);
    // }

    // handleOrgName = event => {
    //     let newOrgName = event.target.value;
    //     return this.props.setCreateOrgName(newOrgName)
    // }

    // handleUserChange = event => {
    //     let users = event.target.value;
    //     return this.props.setNewOrgUsers(users.trim().split(/[\s,]+/))
    // }

    render() {
        const { showCreateOrgModal } = this.props;
        const { orgUsers, orgName, setOrgUsers } = this.state;
        const { usernameDisplay, usernameDisplayWrapper } = styles;
        const usernamesDisplay = (
                    orgUsers.map(user => (
                        <span className={usernameDisplay}>{user}</span>
                        )));
        const form = (
            <CustomForm onSubmit={this.handleSubmit}>
                <CustomFormInput 
                    type="text" 
                    name="orgName" 
                    placeholder="react_slack" 
                    value={orgName}
                    onChange={this.handleOrgName} 
                    label="New Org Name"
                    >Enter Org Name
                </CustomFormInput>
                <div className={usernameDisplayWrapper}>
                    {usernamesDisplay}
                </div>
                <CustomFormInput 
                    type="text" 
                    name="setOrgUsers" 
                    placeholder="#enter users seperated by a space" 
                    value={setOrgUsers}
                    onChange={this.handleUserChange} 
                    label="Users"
                    >Users
                </CustomFormInput>
                <CustomButton 
                    type='submit' 
                    onClick={this.handleSubmit}
                    >Submit
                </CustomButton>
            </CustomForm>
        )
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


