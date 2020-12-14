import { config } from "../Config";

const MessageService = function(apiService) {
    const fetchChannelMessages = (orgName, channelName, beforeDateTime) => {
        const url = `${config.API_URL}/message/channel`;
        const data = {
            org_name: orgName,
            channel_name: channelName
        };
        if (beforeDateTime) {
            data.before_date_time = beforeDateTime;
        }
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return apiService.go(url, options)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages)); 
    };

    const fetchPrivateMessages = (orgName, partnerUsername, beforeDateTime) => {
        const url = `${config.API_URL}/message/private`;
        const data = {
            org_name: orgName,
            partner_username: partnerUsername,
        };
        if (beforeDateTime) {
            data.before_date_time = beforeDateTime;
        }
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return apiService.go(url, options)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages));
    }

    return Object.freeze({
        fetchChannelMessages,
        fetchPrivateMessages,
    });
};

export default MessageService;