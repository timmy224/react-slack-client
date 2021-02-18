const modalOptionsService = () => {

	const deleteUser = (username) => (
		`Are you sure you want to delete user: ${username}?`);
	
	const inviteUser = (members) => (
		`${members} are not part of of your org. Would you like to send an invite?`);
	
	const deleteChannel = (channelName) => (
		`Please confirm you want to delete this channel: ${channelName}?`);
	return {
		deleteUser,
		inviteUser,
		deleteChannel,
	};
};

export default modalOptionsService;
