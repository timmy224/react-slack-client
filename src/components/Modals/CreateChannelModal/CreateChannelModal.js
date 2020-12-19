import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions, services } from "../../../context";
import * as Yup from 'yup';
import { Formik, Form, FieldArray, Field } from "formik";

import CustomButton from '../../UI/CustomButton/CustomButton';
import CustomFormInput from '../../UI/CustomFormInput/FormInput';
import Checkbox from '../../UI/CustomFormInput/Checkbox';
import CustomModal from '../../UI/CustomModal/CustomModal';
import CustomForm from '../../UI/CustomForm/CustomForm';

import styles from './CreateChannelModal.module.css'
import formStyles from '../../UI/CustomForm/CustomForm.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";



const mapStateToProps = (state)=>{
    return { 
        showCreateChannelModal: state.channel.showCreateChannelModal,
        username: state.user.username,
        org: state.org.org,
    }
}
const mapActionsToProps = {
    handleCreateChannelModal: actions.channel.showCreateChannelModal,
}

class CreateChannelModal extends Component {
    state = { takenChannelName: false }

    handleHide = () => {
        const { handleCreateChannelModal } = this.props
        handleCreateChannelModal(false);
        this.setState({takenChannelName: false})
    }

    render() {
        const { takenChannelName} = this.state;
        const { descriptions, errorMsg } = styles
        const { newUserInput, newUserDisplay, inviteMembersDisplay } = styles;
        const { showCreateChannelModal } = this.props;
        const takenMessage = takenChannelName ? <h3 className={errorMsg}>Channel Name taken</h3> : null;
        const form = (
             <>
                <Formik
                        initialValues={{
                        channelName: '',
                        privateUsers: [],
                        isPrivate:false,
                        }}
                        validationSchema={Yup.object({
                        channelName: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        privateUsers: Yup.array()
                            .of(Yup.string()
                                .email('Invalid Email Address')
                                .required('Required')),
                        isPrivate: Yup.boolean()
                        })}
                        onSubmit={(values, { setSubmitting}) =>{
                            const { channelName, isPrivate, privateUsers } = values;
                            const { org, username } = this.props;
                            const name = channelName;
                            const members =  isPrivate ? [...privateUsers,username] : [];
                            const channelInfo ={
                                name,
                                members,
                                isPrivate,
                                orgName: org.name, 
                            }
                            services.channelService.createChannel(channelInfo)
                            .then(response => {
                                if(response.successful){
                                    this.handleHide()
                                }else if(response.users_not_found){
                                    alert(`users_not_found: ${response.users_not_found}`)
                                }else if (response.ERROR){
                                    this.setState({takenChannelName:true})
                                }
                            })
                            setSubmitting(false)
                        }}
                        >
                        {({ values }) => (
                            <Form className={formStyles.CustomForm}>
                                <CustomFormInput
                                    label="Channel Name"
                                    name="channelName"
                                    type="text"
                                    placeholder="#programming"
                                />
                                <FieldArray
                                    name="privateUsers"
                                    >
                                    {({insert, remove, push}) =>(
                                        <div className={inviteMembersDisplay}>
                                            {values.isPrivate && values.privateUsers && values.privateUsers.length > 0 ? (
                                                <div className={newUserInput}>
                                                    <h1>Private Channel Members Invite</h1>
                                                    {values.privateUsers.map((user, index) =>(
                                                        <div key={index} className={newUserDisplay}>
                                                            <CustomFormInput 
                                                                fieldType="nameDisplay" 
                                                                name={`privateUsers.${index}`} 
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
                                                        onClick={() => insert(values.privateUsers.length, '')}
                                                    >  
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </CustomButton>
                                                </div>
                                            ) : values.isPrivate = values.privateUsers.length > 0 ? true : false}
                                        <div>
                                            <h4>Make Private</h4>
                                            <div>
                                                <p className={descriptions}>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                                            </div>
                                            <Checkbox
                                            name="isPrivate" 
                                            label="Make a private Channel"
                                            onClick={() => !values.isPrivate ? push('') : values.privateUsers.forEach((user, index) => remove(index))} 
                                            disabled={values.privateUsers.length > 0 ? true : false}
                                            checked={values.privateUsers.length === 0 ? '': 'checked' }
                                            />
                                        </div>
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
        )
        return (
                <CustomModal 
                    show={showCreateChannelModal} 
                    onHide={this.handleHide} 
                    title="Create a channel"
                    >
                        {takenMessage}
                        {form}
                </CustomModal>    
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannelModal);
