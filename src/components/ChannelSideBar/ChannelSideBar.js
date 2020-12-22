import React, {Component} from "react";
import {connect} from "react-redux";
import CanView from "../CanView/CanView";
import {actions, services, store} from "../../context";

const mapStateToProps = (state) => {
	return {
		channelMemberNames: state.channel.channelMemberNames,
		channelName: state.chat.channel?.name,
		addMember: state.channel.addMember,
		channelId: state.chat.channelId,
	};
};

const mapActionsToProps = {
	fetchMemberNames: actions.channel.fetchMemberNames,
	addChannelMember: actions.channel.addChannelMember,
	removeChannelMember: actions.channel.removeChannelMember,
	updateAddMember: actions.channel.updateAddMember,
	// clearAddMember: actions.channel.clearAddMember,
};
class ChannelSideBar extends Component {
	componentDidMount() {
		const {fetchMemberNames, channelName, orgName} = this.props;
		fetchMemberNames(orgName, channelName);
	}

	handleAddMemberSubmit = (event) => {
		const {
			addChannelMember,
			addMember,
			channelName,
			// clearAddMember,
			orgName,
		} = this.props;
		addChannelMember(orgName, channelName, addMember);
	};

	handleMemberAdd = (event) => {
		let {updateAddMember} = this.props;
		updateAddMember(event.target.value);
	};

	render() {
		let {
			channelMemberNames,
			channelName,
			channelMember,
			removeChannelMember,
			channelId,
			orgName,
		} = this.props;
		let listOfMembers = channelMemberNames.map((channelMember) => (
			<p>{channelMember.username}</p>
		));
		let listOfMembersAdmin = channelMemberNames.map((channelMember) => {
			return (
				<div>
					<button
						text="remove"
						type="button"
						value={channelMember}
						onClick={() =>
							removeChannelMember(
								orgName,
								channelName,
								channelMember.username
							)
						}
					></button>
					<p>{channelMember.username}</p>
				</div>
			);
		});
		return (
			<div>
				<h3>Channel Members</h3>
				<CanView
					resource="channel-member"
					action="add"
					yes={() => <p>{listOfMembersAdmin}</p>}
					no={() => <p>{listOfMembers}</p>}
				/>
				<CanView
					resource="channel-member"
					action="add"
					yes={() => (
						<form onSubmit={this.handleAddMemberSubmit}>
							<label>Add Member</label>
							<input
								type="text"
								value={this.addMember}
								placeholder="Adding member"
								onChange={this.handleMemberAdd}
							/>
						</form>
					)}
					no={() => <p></p>}
				/>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapActionsToProps)(ChannelSideBar);
