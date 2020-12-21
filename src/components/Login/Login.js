import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services} from "../../context";
import * as Yup from 'yup';
import { Formik, Form } from "formik";

import CustomButton from '../UI/CustomButton/CustomButton';
import CustomFormInput from '../UI/CustomFormInput/FormInput';

import formStyles from '../UI/CustomModal/CustomModal.module.css'
import loginStyles from "./Login.module.css";
import registerStyles from "../Register/Register.module.css"
import { Container, } from 'react-bootstrap'

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        routePath: state.route.routePath,
        wrongCredentialsMsg: state.user.wrongCredentialsMsg,
    }
}

const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    changeRoute: actions.route.changeRoute,
    wrongCredentials: actions.user.wrongCredentials,
    loginUser: actions.user.login,
}
    
class Login extends Component {
    
    componentDidMount() {
        services.authService.getCSRFToken()
            .then(response => {
                services.storageService.set("csrf-token", response.headers.get("csrf-token"));
            })
            .catch(err => console.log(err));
    }

    render() {
        const { wrongCredentialsMsg, loginUser, changeRoute  } = this.props;
        const {  logoCol, greenColor, logo, formCol } = loginStyles 
        const { register, create, main, registerForm, content, btns, bottomBorder } = registerStyles 
        const credentialsIncorrect = wrongCredentialsMsg ? <h3>Wrong Username or Password</h3> : null;
        const form = (
            <>
                <Formik
                    initialValues={{
                    username: '',
                    password: '',
                    }}
                    validationSchema={Yup.object({
                    email: Yup.string()
                        .required('Required'),
                    password: Yup.string()
                        .required('No password provided.') 
                    })}
                    onSubmit={(values, {setSubmitting}) =>{
                        const { username, password } = values
                        loginUser(username, password);
                        setSubmitting(false)
                    }}
                    >
                    {({ values }) => (
                        <Form className={`${formStyles.customForm} ${greenColor} ${registerForm}`}>
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
                            <div className={btns}>
                                <CustomButton 
                                type='submit'
                                >Sign In
                                </CustomButton>
                                <CustomButton
                                type="button"
                                onClick = {()=> changeRoute({path:"/register"})}>Register
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
                            {credentialsIncorrect}
                            {form}
                    </div> 
                    <div className={bottomBorder}></div>
                </Container>
            </div>          
        );
        }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);