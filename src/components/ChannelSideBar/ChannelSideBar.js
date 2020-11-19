import React, {Component} from "react";
import {connect} from "react-redux";
import CanView from "../CanView/CanView";
import {actions, services, store} from "../../context";

const mapStateToProps = (state) => {
	return {
		channelMemberNames: state.channel.channelMemberNames,
		channelName: state.chat.channel.name,
		addMember: state.channel.addMember,
		removeMember: state.channel.removeMember,
		channelId: state.chat.channelId,
	};
};

const mapActionsToProps = {
	fetchMemberNames: actions.channel.fetchMemberNames,
	addChannelMember: actions.channel.addChannelMember,
	removeChannelMember: actions.channel.removeChannelMember,
	updateAddMember: actions.channel.updateAddMember,
	clearAddMember: actions.channel.clearAddMember,
	fetchNumMembers: actions.channel.fetchNumMembers,
};
// TODO
// Make a conditional that depending on if the state is a channel or org
// display all channel members (with their roles for clarity)
//if the current user has ADMIN has thier role then allow for remove/add buttons
//remove and add buttons send API requests for the newly created routes
//the proper loading should be re-initiated when these requests are fufilled
// ADD proper CSS

/*
### Remove button
Remove button next to username should fire off an api call to remove that user from the channel. Pass the channel id and username to remove to the server.
 Query for the channel model. Remove the user model associated with that username from channel_model.users.
  Then update so the change goes into database (google flask-sqlalchemy updating field on a record in database)
The api route should also socket emit to the user that was removed "removed-from-channel" containing the channel_id in case they're online now.
 Timmy and I are working on getting emitting to a specific sid working from http route so you'll have to wait on this a bit but this is what should happen:

Listen for this event on the client and when you get it trigger a refresh of the sidebar.
 You also have to account for one more thing, what if the channel the user is currently viewing is the one he was deleted from? 
Check for this by comparing to state.chat.channel.channel_id. If that ended up being the case, select the top channel in the sidebar. See how I did this in sidebar module actions.js

```python
const defaultChannel = utilityService.getFirstProp(channels);
            dispatch(selectChannel(defaultChannel.channel_id));
```
### Add people button

If the admin is viewing the channel sidebar, and "Add people" button should be displayed below the member list which will expose multivalue text input component when clicked,
 allowing us to invite more members. Add another button under the multivalue text input component to actually send the invites. 
The button should fire off an api call which will accept a channel_id and list of usernames to add to the channel
You can add them to the channel by querying for the channel and adding the corresponding user models to channel_model.users. 
 In case any of the users that were added are currently online, you're going to want to send them "added-to-channel" event. 
 You'll have to look in client_service to get their sid which acts as the room to emit on, 
 but Timmy and I are working on getting emitting to a specific sid working from http route so you'll have to wait on this a bit
*/

class ChannelSideBar extends Component {
	componentDidMount() {
		const {fetchMemberNames, channelName} = this.props;
		fetchMemberNames(channelName);
	}

	handleAddMemberSubmit = (event) => {
		const {
			addChannelMember,
			addMember,
			channelName,
			clearAddMember,
			fetchMemberNames,
			fetchNumMembers,
		} = this.props;
		addChannelMember(channelName, addMember);
		clearAddMember();
		fetchMemberNames(channelName);
		fetchNumMembers(channelName);
	};

	handleMemberAdd = (event) => {
		let {updateAddMember} = this.props;
		updateAddMember(event.target.value);
	};

	render() {
		let {
			fetchMemberNames,
			channelMemberNames,
			channelName,
			channelMember,
			removeChannelMember,
			channelId,
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
