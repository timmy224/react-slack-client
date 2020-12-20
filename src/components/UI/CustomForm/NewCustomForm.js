// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { actions } from "../../../context";
// import * as Yup from 'yup';
// import { Formik, Form, FieldArray} from "formik";

// import CustomModal from '../../UI/CustomModal/CustomModal';
// import CustomButton from '../../UI/CustomButton/CustomButton';
// import CustomFormInput from '../../UI/CustomFormInput/NewCustomFormInput';

// import styles from '../CreateChannelModal/CreateChannelModal.module.css'
// import formStyles from '../../UI/CustomForm/CustomForm.module.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";

// const form = (props) =>(
//             <>
//                 <Formik
//                         initialValues={{
//                         orgName: '',
//                         invitedUsers: [],
//                         }}
//                         validationSchema={Yup.object({
//                         orgName: Yup.string()
//                             .max(15, 'Must be 15 characters or less')
//                             .required('Required'),
//                         invitedUsers: Yup.array()
//                             .of(Yup.string()
//                                 .email('Invalid Email Address')
//                                 .required('Required')
//                         )})}
//                         onSubmit={(values, { setSubmitting}) =>{
//                             props.handleSubmit(values)
//                             setSubmitting(false)
//                         }}
//                         >
//                         {({ values }) => (
//                             <Form className={customForm}>
//                                 <CustomFormInput
//                                     label="Org Name"
//                                     name="orgName"
//                                     type="text"
//                                     placeholder="react_slack"
//                                 />
//                                 <FieldArray
//                                     name="invitedUsers"
//                                     >
//                                     {({insert, remove, push}) =>(
//                                         <div className={inviteMembersDisplay}>
//                                             {values.invitedUsers && values.invitedUsers.length > 0 ? (
//                                                 <div className={newUserInput}>
//                                                     <h1>New Members Invite</h1>
//                                                     {values.invitedUsers.map((user, index) =>(
//                                                         <div key={index} className={newUserDisplay}>
//                                                             <CustomFormInput 
//                                                                 fieldType="nameDisplay" 
//                                                                 name={`invitedUsers.${index}`} 
//                                                                 placeholder="react_slack@gmail.com"
//                                                                 />
//                                                             <CustomButton
//                                                                 btnType="delete"
//                                                                 type="button"
//                                                                 onClick={() => remove(index)}
//                                                             > 
//                                                                 <FontAwesomeIcon icon={faTimes} />
//                                                             </CustomButton>
//                                                         </div>
//                                                     ))}
//                                                     <CustomButton
//                                                         type="button"
//                                                         onClick={() => insert(values.invitedUsers.length, '')}
//                                                     >  
//                                                         <FontAwesomeIcon icon={faPlus} />
//                                                     </CustomButton>
//                                                 </div>
//                                             ) :  (
//                                                 <CustomButton 
//                                                     type="button" 
//                                                     onClick={() => push('')}
//                                                     >Invite new members
//                                                 </CustomButton>
//                                             )}
//                                         </div>
//                                     )}
//                                 </FieldArray>
//                                 <CustomButton 
//                                     type='submit'
//                                     btnType="enter" 
//                                     >Submit
//                                 </CustomButton>
//                             </Form>
//                     )}
//                 </Formik>
//             </>
//         );

// export default form;