import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../../context";
import * as Yup from 'yup';
import { Formik, Form, FieldArray} from "formik";

import CustomModal from '../../UI/CustomModal/CustomModal';
import CustomButton from '../../UI/CustomButton/CustomButton';
import CustomFormInput from '../../UI/CustomFormInput/FormInput';

import styles from '../CreateChannelModal/CreateChannelModal.module.css'
import formStyles from '../../UI/CustomForm/CustomForm.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";

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
    state = {takenOrgName: false};
    
    handleHide = () => {
        const { handleShowCreateOrgModal} = this.props
        handleShowCreateOrgModal(false);
        this.setState({takenOrgName: false})
    }

    render() {
        const { showCreateOrgModal } = this.props;
        const {  takenOrgName } = this.state;
        const { newUserInput, newUserDisplay, inviteMembersDisplay } = styles;
        const orgNameTakenMsg = takenOrgName ? <h3>Org name taken, Try another</h3> : null;
        const form = (
            <>
                <Formik
                        initialValues={{
                        orgName: '',
                        invitedUsers: [],
                        }}
                        validationSchema={Yup.object({
                        orgName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        invitedUsers: Yup.array()
                            .of(Yup.string()
                                .email('Invalid Email Address')
                                .required('Required')
                        )})}
                        onSubmit={(values, { setSubmitting}) =>{
                            const { createOrg } = this.props;
                            const { orgName, invitedUsers } = values;
                            createOrg(orgName, invitedUsers)
                                .then(response => {
                                    if (response.successful) {
                                        this.handleHide()
                                    } else {
                                        this.setState({takenOrgName:true})
                                    } 
                                });
                            setSubmitting(false)
                        }}
                        >
                        {({ values }) => (
                            <Form className={formStyles.CustomForm}>
                                <CustomFormInput
                                    label="Org Name"
                                    name="orgName"
                                    type="text"
                                    placeholder="react_slack"
                                />
                                <FieldArray
                                    name="invitedUsers"
                                    >
                                    {({insert, remove, push}) =>(
                                        <div className={inviteMembersDisplay}>
                                            {values.invitedUsers && values.invitedUsers.length > 0 ? (
                                                <div className={newUserInput}>
                                                    <h1>New Members Invite</h1>
                                                    {values.invitedUsers.map((user, index) =>(
                                                        <div key={index} className={newUserDisplay}>
                                                            <CustomFormInput 
                                                                fieldType="nameDisplay" 
                                                                name={`invitedUsers.${index}`} 
                                                                placeholder="react_slack@gmail.com"
                                                                />
                                                            <CustomButton
                                                                btnType="delete"
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                            > 
                                                                <FontAwesomeIcon icon={faTimes} />
                                                            </CustomButton>
                                                        </div>
                                                    ))}
                                                    <CustomButton
                                                        type="button"
                                                        onClick={() => insert(values.invitedUsers.length, '')}
                                                    >  
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </CustomButton>
                                                </div>
                                            ) :  (
                                                <CustomButton 
                                                    type="button" 
                                                    onClick={() => push('')}
                                                    >Invite new members
                                                </CustomButton>
                                            )}
                                        </div>
                                    )}
                                </FieldArray>
                                <CustomButton 
                                    type='submit'
                                    btnType="enter" 
                                    >Submit
                                </CustomButton>
                            </Form>
                    )}
                </Formik>
            </>
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


