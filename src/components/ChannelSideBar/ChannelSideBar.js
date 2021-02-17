import React, {Component} from "react";
import {connect} from "react-redux";
import {actions, services} from "../../context";

import * as Yup from "yup";
import { Formik, Form, FieldArray } from "formik";
import CanView from "../CanView/CanView";
import CustomButton from "../UI/CustomButton/CustomButton";
import CustomFormInput from "../UI/CustomFormInput/FormInput";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faUserMinus } from "@fortawesome/free-solid-svg-icons";
import formStyles from "../UI/CustomModal/CustomModal.module.css";
import styles from "./ChannelSideBar.module.css";

const mapStateToProps = (state) => {
	const mapping = {
		orgName: state.org.org.name,
		channelName: state.chat.channel?.name,
		channel: state.chat.channel,
		addMember: state.channel.addMember,
		channelId: state.chat.channelId,
		currentUser: state.user.username
  	};
	const { orgName, channelName } = mapping;
	if (orgName) {
		mapping.channelMembers = state.channel.channels[orgName]?.[channelName]?.members
	}
  	return mapping;
};

const mapActionsToProps = {
	updateMembersCall: actions.channel.updateMembersCall,
};

//TODO
//Filter out user so he is not allowed to delete himself
//Make a dropdown menu so we can assign members new roles
//Make a button so user can delete himself and assign admin 
//role to a different user if channel is left without admin
//Confirm that you want to remove a member
//Have field input and enter button removed once entered
//Check if Invited Users are part of org if not ask if you 
//should send an org invite if permission allow
//Test code and ensure everything works as expected

class ChannelSideBar extends Component {
	validationSchema = () =>
		Yup.object().shape({
			invitedUsers: Yup.array().of(
				Yup.string().email("Invalid Email Address").required("Required")
			),
		});

	handleSubmit = (values, {setSubmitting}) => {
		const { updateMembersCall, channelName, orgName } = this.props;
		const { invitedUsers } = values;
		const method = "POST", action = "STORE"
		updateMembersCall(orgName, channelName, invitedUsers, method, action );
		setSubmitting(false);
	};

	handleRemoveMember = username => {
		const { orgName, channelName, updateMembersCall } = this.props
		const method = "DELETE"
		updateMembersCall(orgName, channelName, [username], method)
	}

	render() {
		const { channelSideBar, header, body, sidebarItem, sidebarUser, customForm, remove, disable, customButton, cancel } = styles;
		const { inviteMembersDisplay, newUserDisplay } = formStyles;
		const { channelMembers, currentUser } = this.props;
		const nonUserMembers = channelMembers.filter(({username}) => username !== currentUser)
		const channelMembersDisplay = services.utilityService.isEmpty(nonUserMembers )
			? <h2>Loading users...</h2>
			: (<>
				<div key={currentUser} className={sidebarItem}>
					<p className={sidebarUser}>{currentUser}</p>
				</div>
				{nonUserMembers .map(({ username }) => (
					<div key={username} className={sidebarItem}>
						<p className={sidebarUser}>{username}</p>
						<CanView
							resource="channel-member"
							action="add"
							yes={() => (

								<button
									className={remove}
									type="button"
									value={username}
									onClick={() => this.handleRemoveMember(username)}
								>
									<FontAwesomeIcon icon={faUserMinus} />
								</button>
							)}
							no={() => <p></p>}
						/>
					</div>
				))}
			</>
		);
		const form = (
			<>
				<Formik
					initialValues={{
						invitedUsers: [],
					}}
					validationSchema={this.validationSchema}
					onSubmit={this.handleSubmit}
				>
					{({ values }) => (
						<Form className={customForm}>
							<FieldArray name="invitedUsers">
								{({ insert, remove, push }) => (
									<div className={inviteMembersDisplay}>
										{values.invitedUsers.map(
											(_email, index) => (
												<div
													key={index}
													className={newUserDisplay}
												>
													<CustomFormInput
														fieldType="nameDisplay"
														name={`invitedUsers.${index}`}
														placeholder="react_slack@gmail.com"
													/>
													<button
														className={cancel}
														type="button"
														onClick={() =>remove(index)}
													>
														<FontAwesomeIcon
															icon={faTimes}
														/>
													</button>
												</div>
											)
										)}
										<CustomButton
											type="button"
											onClick={() => push("")}
										>Add Member
										</CustomButton>
									</div>
								)}
							</FieldArray>
							<button
								type="submit"
								btnType="enter"
								className={`${
									values.invitedUsers.length === 0 ? disable: null} ${customButton}`}
							>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</>
		);
		return (
			<div className={channelSideBar}>
				<div className={header}>
					<h1>Channel Members</h1>
				</div>
				<div className={body}>
					{channelMembersDisplay}
					<CanView
						resource="channel-member"
						action="add"
						yes={() => <>{form}</>}
						no={() => null}
					/>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapActionsToProps)(ChannelSideBar);
