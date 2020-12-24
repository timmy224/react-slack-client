import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services} from "../../../context";
import * as Yup from 'yup';
import { Formik, Form } from "formik";

import CustomButton from '../../UI/CustomButton/CustomButton';
import CustomFormInput from '../../UI/CustomFormInput/FormInput';

import formStyles from '../UI/CustomModal/CustomModal.module.css'
import styles from "../Entry.module.css"
import { Container, } from 'react-bootstrap'

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        routePath: state.route.routePath,
    }
}

const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    changeRoute: actions.route.changeRoute,
    login: actions.user.login,
}
    
class Login extends Component {
    
    componentDidMount() {
        services.authService.getCSRFToken()
            .then(response => {
                services.storageService.set("csrf-token", response.headers.get("csrf-token"));
            })
            .catch(err => console.log(err));
    }

    validationSchema = () => (
        Yup.object().shape({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('No password provided') ,
            })
    );

    render() {
        const { changeRoute } = this.props;
        const { register, create, main, registerForm, content, btns, bottomBorder, logoCol, greenColor, logo, formCol } = styles;
        const {errorMsg, customForm } = formStyles 
        const form = (
            <>
                <Formik
                    initialValues={{
                    username: '',
                    password: '',
                    }}
                    validationSchema={this.validationSchema}
                    onSubmit={(values, {setSubmitting, setStatus}) =>{
                        const { login, setUsername } = this.props
                        const { username, password } = values
                        setUsername(username)
                        login(username, password)
                            .then(response => response ? setStatus(`${response}`) : null)
                        setSubmitting(false)
                    }}
                    >
                    {({status}) => (
                        <Form className={`${customForm} ${greenColor} ${registerForm}`}>
                            {status ? <p className={errorMsg}>{status}</p> : null}
                            <CustomFormInput
                                label="Enter Email Address"
                                name="username"
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
                                onClick = {()=> changeRoute({path:"/register"})}
                                >Register
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
                            <h2 className={register}>Sign in to Kcals</h2>
                            <h6 className={create}>Continue with the username and password you use to sign in.</h6>
                            {form}
                    </div> 
                    <div className={bottomBorder}></div>
                </Container>
            </div>          
        );
        }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);