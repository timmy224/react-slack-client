const InvitationService = function(apiService) {
    const fetchInvitations = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/org/invitations";
        let localUrl = "http://localhost:5000/org/invitations";

        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => data.invitations);
    }

    return Object.freeze({
        fetchInvitations,
    });
};

export default InvitationService;