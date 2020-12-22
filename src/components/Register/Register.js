import React, { Component } from 'react';
import { connect } from "react-redux";
import { services, actions } from "../../context";
import * as Yup from 'yup';
import { Formik, Form } from "formik";

import CustomButton from '../UI/CustomButton/CustomButton';
import CustomFormInput from '../UI/CustomFormInput/FormInput';

import formStyles from '../UI/CustomModal/CustomModal.module.css'
import styles from "./Register.module.css"
import { Container} from 'react-bootstrap'

const mapStateToProps = (state)=>{
    return { 
        username: state.user.username,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
    }
}
const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    changeRoute: actions.route.changeRoute,
}

class Register extends Component {

    render() {
        const { register, create, main, registerForm, content, btns, bottomBorder, logoCol, greenColor, logo, formCol } = styles 
        const { errorMsg, customForm } = formStyles
        const { changeRoute } = this.props
        const form = (
            <>
                <Formik
                    initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: '',
                    }}
                    validationSchema={Yup.object({
                    email: Yup.string()
                            .email('Invalid Email Address')
                            .required('Required'),
                    password: Yup.string()
                        .required('No password provided')
                        .min(8, 'Password is too short - should be 8 characters minimum.')
                        .matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, 'Password must be at least one letter, one number and one special character'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    })}
                    onSubmit={(values, {setSubmitting, setStatus}) =>{
                        const { setUsername, changeRoute } = this.props
                        const { email, password } = values
                        services.registerService.registerUser(email, password)
                            .then(response => {
                                if (response.successful) {
                                    services.storageService.set("username", email);
                                    setUsername(email)
                                    this.setState({showTakenUsernameMsg: false})
                                    changeRoute({path:"/login"})
                                }else if (response.ERROR){
                                    setStatus('username is already in use')
                                } 
                            })
                        setSubmitting(false)
                    }}
                    >
                    {({status}) => (
                        <Form className={`${customForm} ${greenColor} ${registerForm}`}>
                            {status ? <p className={errorMsg}>{status}</p> : null}
                            <CustomFormInput
                                label="Enter Email Address"
                                name="email"
                                type="text"
                                placeholder="react_slack2020@gmail.com"
                            />
                            <CustomFormInput
                                label="Enter Password"
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                            <CustomFormInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="confirm password"
                            />
                            <div className={btns}>
                                <CustomButton 
                                type='submit'
                                >Submit
                                </CustomButton>
                                <CustomButton
                                type="button"
                                onClick = {()=> changeRoute({path:"/login"})}
                                >Login
                                </CustomButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        );
        return (
            <div className={main}>
                <Container className={content}>
                    <div className={`${logoCol} ${greenColor}`}>
                    <img 
                        className={logo}
                        alt="logo"
                        src="https://www.sblack.online/img/icon.png">
                    </img>
                    </div>
                    <div className={`${formCol} ${greenColor}`}>
                            <h1 className={register}>Register a new account</h1>
                            <h6 className={create}>Create an account with the username and password you will use to sign in.</h6>
                            {form}
                    </div> 
                    <div className={bottomBorder}></div>
                </Container>
            </div>          
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Register);