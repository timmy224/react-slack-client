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
        showCreateOrgModal: state.org.showCreateOrgModal,
        username: state.user.username,
    }
}
const mapActionsToProps = {
    createOrg: actions.org.createOrg,
    handleShowCreateOrgModal: actions.org.showCreateOrgModal,
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
        const { orgName,  orgUsers } = this.state;
        event.preventDefault();
        createOrg(orgName, orgUsers)
            .then(response => {
                if (response.successful) {
                    this.handleHide()
                } else {
                    this.setState({takenOrgName:true})
                } 
            });
    }

    render() {
        const { showCreateOrgModal } = this.props;
        const { orgUsers, orgName, setOrgUsers, takenOrgName } = this.state;
        const { usernameDisplay, usernameDisplayWrapper } = styles;
        const orgNameTakenMsg = takenOrgName ? <h3>Org name taken, Try another</h3> : null;
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
        );
        return (
            <CustomModal 
                show={showCreateOrgModal} 
                onHide={this.handleHide}
                title="Create a new Org"
                >
                    {orgNameTakenMsg}
                    {form}
            </CustomModal>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateOrgModal
    );


