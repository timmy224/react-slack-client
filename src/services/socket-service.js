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

    const connect = dataObject => {
        const url = config.API_URL;
        let value = dataObject.username
        let query_val = `username=${value}`
        let queryObj = { query: query_val }
        socket = io(url, queryObj)
        setUpEventListeners();
        return socket
    };

    const send = (event_name, obj) => {
        // assuming socket declared when connected
        socket.emit(event_name, obj)
        console.log(event_name, "with", obj, "sent.")
    };

    const disconnect = () => {
        // assuming socket declared when connected
        socket.emit("disconnect")
        socket.disconnect()
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

        socket.on('message-received', message => {
            console.log("message-received: ", message);
            console.log(
                `Sender: ${message.sender},
                Time Sent: ${message.time_sent},
                Content: ${message.content}`
            );
            store.dispatch(actions.message.messageReceived(message))
        });

        socket.on("channel-deleted", info => {
            console.log("channel-deleted", info);
            const { org_name: orgName, channel_name: channelName } = info;
            store.dispatch(actions.channel.channelDeleted(orgName, channelName));
        });

        socket.on("added-to-channel", async info => {
            console.log("added-to-channel", info);
            const orgName = info.org_name;
            const channel = info.channel;
            store.dispatch(actions.channel.addedToChannel(orgName, channel));
            const joinInfo = { "org_name": orgName, "channel_name": channel.name };
            send("join-channel", joinInfo);
        });

        socket.on("permissions-updated", () => {
            console.log("permissions-updated");
            store.dispatch(actions.permission.fetchPermissions());
        });

        socket.on("invited-to-org", orgName => {
            console.log("invited-to-org", orgName);
            store.dispatch(actions.invitation.fetchInvitations());
        });

        socket.on("added-to-org", async orgName => {
            console.log("added-to-org", orgName);
            store.dispatch(actions.org.addedToOrg(orgName));
            send("join-org", orgName);
        });

        socket.on("new-org-member", info => {
            const { org_name: orgName, org_member: orgMember } = info;
            console.log(`new-org-member: ${orgName}: ${orgMember}`);
            store.dispatch(actions.org.addOrgMember(orgName, orgMember));
        });

        socket.on("org-member-online", info => {
            const { org_name: orgName, username } = info;
            console.log(`org-member-online: ${orgName}: ${username}`);
            store.dispatch(actions.org.setOrgMemberOnlineStatus(orgName, username, true));
        });

        socket.on("org-member-offline", info => {
            const { org_name: orgName, username } = info;
            console.log(`org-member-online: ${orgName}: ${username}`);
            store.dispatch(actions.org.setOrgMemberOnlineStatus(orgName, username, false));
        });

        socket.on("org-deleted", orgName => {
            console.log("org-deleted", orgName);
            store.dispatch(actions.org.handleOrgDeleted(orgName));
        });
        //TO ALL IN CHANNEL with a removed member 
			socket.on("channel-member-removed", (data) => {
			let channelName = data.channel_name;
			let removedUsername = data.removed_username;
			let channelId = data.channel_id;
            let orgName = data.org_name;
            //SETS CHANNEL MEMBERS
            store.dispatch(
				actions.channel.removedChannelMember(
					orgName,
					channelName,
					removedUsername
				)
            );
            store.dispatch(actions.sidebar.selectChannel(channelName))
            send("leave-channel", data);
        });
        //TO Removed member
		socket.on("removed-from-channel", (data) => {
			let channelName = data.channel_name;
			let removedUsername = data.removed_username;
			let channelId = data.channel_id;
			let orgName = data.org_name;
            store.dispatch(actions.channel.channelDeleted(orgName, channelName))
		});
		socket.on("member-added-to-channel", (data) => {
			let addedUsername = data.added_username;
			let channelName = data.channel_name;
            let orgName = data.org_name;
            let channel = data.channel			
            console.log(`User ${addedUsername} has been added to channel ${channelName}`);
            //allows refresh for new added member
           store.dispatch(actions.channel.addedToChannel(orgName, channel));			
		});
		socket.on("new-member-added-to-channel", (data) => {
			let addedUsername = data.added_username;
			let channelName = data.channel_name;
			let orgName = data.org_name;
			let channel = data.channel;
			console.log(
				`User ${addedUsername} has been added to channel ${channelName}`
			);
			//Allows reload of channelmembers on the channel sidebar for entire channel
			store.dispatch(actions.channel.fetchChannels(orgName));
			store.dispatch(actions.sidebar.selectChannel(channelName));
		});
		
    };

    return Object.freeze({
        getConnected,
        getConnected$,
        connect,
        send,
        disconnect
    });
}

export default SocketService;
