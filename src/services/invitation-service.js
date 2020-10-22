const InvitationService = function(apiService) {
    const fetchInvitations = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/org/invitations";
        let localUrl = "http://localhost:5000/org/invitations";

        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => data.invitations);
    }
    const createInvite = (inviteInfo) => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/org/inviteuser";
        let localUrl = "http://localhost:5000/org/inviteuser";

        const post_data = {
            inviteInfo,
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(localUrl, options)
            .then(response => response.json())
    };

    return Object.freeze({
        fetchInvitations,
        createInvite,
    });
};

export default InvitationService;