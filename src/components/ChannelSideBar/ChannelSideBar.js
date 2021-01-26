import React, {Component} from "react";
import {connect} from "react-redux";
import CanView from "../CanView/CanView";
import {actions, services, store} from "../../context";
import styles from "./ChannelSideBar.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {Formik, Form, FieldArray} from "formik";
import CustomButton from "../UI/CustomButton/CustomButton";
import CustomFormInput from "../UI/CustomFormInput/FormInput";
import formStyles from "../UI/CustomModal/CustomModal.module.css";

const mapStateToProps = (state) => {
	const mapping = {
		org: state.org.org,
		channelName: state.chat.channel?.name,
		channel: state.chat.channel,
		addMember: state.channel.addMember,
		channelId: state.chat.channelId,
  	};
	const { org, channelName } = mapping;
	if (org) {
		mapping.channelMembers = state.channel.channels[org.name]?.[channelName]?.members
	}
  	return mapping;
};

const mapActionsToProps = {
	fetchMemberNames: actions.channel.fetchMemberNames,
	addChannelMember: actions.channel.addChannelMember,
	removeChannelMember: actions.channel.removeChannelMember,
	updateAddMember: actions.channel.updateAddMember,
	
};
class ChannelSideBar extends Component {
	componentDidMount() {
		const {fetchMemberNames, channelName, org} = this.props;
		fetchMemberNames(org.name, channelName);
	}
	validationSchema = () =>
		Yup.object().shape({
			invitedUsers: Yup.array().of(
				Yup.string().email("Invalid Email Address").required("Required")
			),
		});

	handleAddMemberSubmit = (event) => {
		if (event.invitedUsers)
		{let addMember = event.invitedUsers[0]
		const {addChannelMember, channelName, org, channel} = this.props;
		addChannelMember(org.name, channelName, addMember, channel);}
	};

	handleMemberAdd = (event) => {
		let {updateAddMember} = this.props;
		updateAddMember(event.target.value);
	};

	render() {
		const {emailInput, channelSideBar, header, body, sidebarItem, sidebarUser, customForm, removeButton, userDisplay} = styles;
		const {newUserDisplay, newUserInput, inviteMembersDisplay } = formStyles;
		let {
			channelName,
			channelMembers,
			removeChannelMember,
			channelId,
			org,
		} = this.props;

		// let listOfMembers = channelMemberNames.map((channelMember) => (
		//   <p>{channelMember.username}</p>
		// ));

		let channelMembersDisplay = services.utilityService.isEmpty(
			channelMembers
		) ? (
			<h2>Loading users...</h2>
		) : (
			channelMembers.map(({username}) => (
				<div key={username} className={sidebarItem}>
					<p className={sidebarUser}>{username}</p>
					<CanView
						resource="channel-member"
						action="add"
						yes={() => (
							<button
								className={removeButton}
								text="remove"
								type="button"
								value={username}
								onClick={() =>
									removeChannelMember(
										org.name,
										channelName,
										username
									)
								}
							>
								<FontAwesomeIcon
								 icon={faUserMinus} />
							</button>
						)}
						no={() => <p></p>}
					/>
				</div>
			))
		);
		const form = (
			<>
				<Formik
					initialValues={{
						invitedUsers: [""],
					}}
					validationSchema={this.validationSchema}
					onSubmit={this.handleAddMemberSubmit}
				>
					{({values}) => (
						<Form className={customForm}>
							<FieldArray name="invitedUsers">
								{({insert, remove}) => (
									<div className={inviteMembersDisplay}>
										<div className={newUserInput}>
											{values.invitedUsers.map(
												(_email, index) => (
													<div
														key={index}
														className={userDisplay}
													>
														<CustomFormInput
														className={emailInput}
															fieldType="nameDisplay"
															name={`invitedUsers.${index}`}
															placeholder="react_slack@gmail.com"
														/>
														<CustomButton
														className={removeButton}
															btnType="delete"
															type="button"
															onClick={() =>
																remove(index)
															}
														>
															<FontAwesomeIcon
																icon={faTimes}
															/>
														</CustomButton>
													</div>
												)
											)}
											<CustomButton
												type="button"
												onClick={() =>
													insert(
														values.invitedUsers
															.length,
														""
													)
												}
											>
												<FontAwesomeIcon
													icon={faPlus}
												/> Add Another Member
											</CustomButton>
										</div>
									</div>
								)}
							</FieldArray>
							<CustomButton
								type="submit"
								btnType="enter"
								disabled={
									values.invitedUsers.length === 0
										? true
										: false
								}
								onClick={this.handleAddMemberSubmit}
							>
								Add All Members
							</CustomButton>
						</Form>
					)}
				</Formik>
			</>
		);
		return (
			<div className={channelSideBar}>
				<div className={header}>
					<h3>Channel Members</h3>
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
