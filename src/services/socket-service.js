import io from "socket.io-client";
import {Subject} from "rxjs";
import {actions, store} from "../context";
import {config} from "../Config";

function SocketService(chatService) {
	let socket;
	let isConnected = false;
	let connected$ = new Subject();

	const getConnected = () => isConnected;

	const getConnected$ = () => connected$;

	const connect = (dataObject) => {
		const url = config.API_URL;
		let value = dataObject.username;
		let query_val = `username=${value}`;
		let queryObj = {query: query_val};
		socket = io(url, queryObj);
		setUpEventListeners();
		return socket;
	};

	const send = (event_name, obj) => {
		// assuming socket declared when connected
		socket.emit(event_name, obj);
		console.log(event_name, "with", obj, "sent.");
	};

	const disconnect = () => {
		// assuming socket declared when connected
		socket.emit("disconnect");
		socket.disconnect();
		isConnected = false;
	};

	const setUpEventListeners = () => {
		socket.on("connect", () => {
			isConnected = true;
			connected$.next(true);
		});

		socket.on("connect_error", () => {
			isConnected = false;
			connected$.next(false);
		});

		socket.on("user-joined-chat", (user_join) => {
			console.log("user_join", user_join);
			console.log(`User joined the chat: ${user_join.username}`);
			chatService.onUserJoinedChat(user_join.username);
		});

		socket.on("message-received", (message) => {
			console.log("message-received: ", message);
			console.log(
				`Sender: ${message.sender},
          Time Sent: ${message.time_sent},
          Content: ${message.content}`
			);
			store.dispatch(actions.message.messageReceived(message));
		});

		socket.on("channel-deleted", (info) => {
			console.log("channel-deleted", info);
			const {org_name: orgName, channel_name: channelName} = info;
			store.dispatch(
				actions.channel.channelDeleted(orgName, channelName)
			);
		});

		socket.on("added-to-channel", async (info) => {
			console.log("added-to-channel", info);
			const orgName = info.org_name;
			const channel = info.channel;
			store.dispatch(actions.channel.addedToChannel(orgName, channel));
			const joinInfo = {org_name: orgName, channel_name: channel.name};
			send("join-channel", joinInfo);
		});

		socket.on("permissions-updated", () => {
			console.log("permissions-updated");
			store.dispatch(actions.permission.fetchPermissions());
		});

		socket.on("invited-to-org", (orgName) => {
			console.log("invited-to-org", orgName);
			store.dispatch(actions.invitation.fetchInvitations());
		});

		socket.on("added-to-org", async (orgName) => {
			console.log("added-to-org", orgName);
			store.dispatch(actions.org.addedToOrg(orgName));
			send("join-org", orgName);
		});

		socket.on("new-org-member", (info) => {
			const {org_name: orgName, org_member: orgMember} = info;
			console.log(`new-org-member: ${orgName}: ${orgMember}`);
			store.dispatch(actions.org.addOrgMember(orgName, orgMember));
		});

		socket.on("org-member-online", (info) => {
			const {org_name: orgName, username} = info;
			console.log(`org-member-online: ${orgName}: ${username}`);
			store.dispatch(
				actions.org.setOrgMemberOnlineStatus(orgName, username, true)
			);
		});

		socket.on("org-member-offline", (info) => {
			const {org_name: orgName, username} = info;
			console.log(`org-member-online: ${orgName}: ${username}`);
			store.dispatch(
				actions.org.setOrgMemberOnlineStatus(orgName, username, false)
			);
		});

		socket.on("channel-member-removed", (data) => {
			let channelName = data.channel_name;
			let removedUsername = data.removed_username;
			let channelId = data.channel_id;
			let orgName = data.org_name;
			store.dispatch(actions.channel.fetchMemberNames(orgName, channelName));
			send("leave-channel", data);
		});
		socket.on("removed-from-channel", (data) => {
			let channelName = data.channel_name;
			let removedUsername = data.removed_username;
			let channelId = data.channel_id;
			let orgName = data.org_name;
			console.log(
				`User ${removedUsername} removed from channel ${channelName}  with ID ${channelId} in org ${orgName}`
			);
			store.dispatch(actions.channel.fetchChannels(orgName));

			// this line isnt working to reload messages for removed user

			// store.dispatch(actions.message.fetchChannelMessages(channelName))
		});
		socket.on("added-to-channel", (channelName) => {
			console.log("channel member added to ChannelName ", channelName);
			store.dispatch(actions.channel.fetchChannels());
			store.dispatch(actions.channel.fetchMemberNames(channelName));
		});
	};

	return Object.freeze({
		getConnected,
		getConnected$,
		connect,
		send,
		disconnect,
	});
}

export default SocketService;
