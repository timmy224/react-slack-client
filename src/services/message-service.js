import { config } from "../Config";

const MessageService = function(apiService) {
    const fetchChannelMessages = channelId => {
        const url = `${config.API_URL}/message/channel/?channel_id=${channelId}`;
        return apiService.go(url)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages)); 
    };

    const fetchPrivateMessages = (partnerUsername) => {
        const url = `${config.API_URL}/message/private/?username2=${partnerUsername}`;
        return apiService.go(url)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages));
    }

    return Object.freeze({
        fetchChannelMessages,
        fetchPrivateMessages,
    });
};

export default MessageService;