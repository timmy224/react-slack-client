const InvitationService = function(apiService) {
    const fetchInvitations = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/org/invite";
        let localUrl = "http://localhost:5000/org/invite"

        const post_data = {
            action: "GET"
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(localUrl,options)
            .then(response => response.json())
            .then(data => JSON.parse(data.org_invites));
    }
    const createInvite = (inviteInfo) => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/org/invite";
        let localUrl = "http://localhost:5000/org/invite";

        const options = {
            method: "POST",
            body: JSON.stringify(inviteInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(localUrl, options)
            .then(response => response.json())
    };
    const respondToInvite = (responseInfo) => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/org/invite-response";
        let localUrl = "http://localhost:5000/org/invite-response";

        const options = {
            method: "POST",
            body: JSON.stringify(responseInfo),
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
        respondToInvite,
    });
};

export default InvitationService;