const modalOptionsService = () => {

	const deleteUser = username => (
		`Are you sure you want to delete user: ${username}?`);
	
	const inviteUser = members => {
		if (members.length === 1) {
			return `User: ${members[0]} is not a part of of your org. Would you like to send an org invite?`;
		} else {
			return `Users: ${members.join(', ')} are not a part of of your org. Would you like to send org invites?`;
		}
		
	}
	
	const deleteChannel = channelName => (
		`Please confirm you want to delete this channel: ${channelName}?`);
	return {
		deleteUser,
		inviteUser,
		deleteChannel,
	};
};

export default modalOptionsService;
