import { config } from "../Config";

const InvitationService = function(apiService) {
    const fetchInvitations = () => {
        const url = `${config.API_URL}/org/invite`;

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

        return apiService.go(url, options)
            .then(response => response.json())
            .then(data => JSON.parse(data.org_invites));
    }

    const sendInvites = (orgName, invitedEmails) => {
        const url = `${config.API_URL}/org/invite`;
        const data = {
            action: "STORE",
            org_name: orgName,
            invited_emails: invitedEmails
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(url, options)
            .then(response => response.json())
    };
    
    const respondToInvite = (orgName, isAccepted) => {
        const url = `${config.API_URL}/org/invite-response`;

        const data = {
            org_name: orgName,
            is_accepted: isAccepted
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(url, options)
            .then(response => response.json())
    };

    return Object.freeze({
        fetchInvitations,
        sendInvites,
        respondToInvite,
    });
};

export default InvitationService;