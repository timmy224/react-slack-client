const MessageService = function() {
    const fetchChannelMessages = channelId => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/channel-messages/?channel_id=${channelId}`;
        let localUrl = `http://localhost:5000/channel-messages/?channel_id=${channelId}`;
        
        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages)); 
    };

    const fetchPrivateMessages = (ourUsername, partnerUsername) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/private-messages/?username1=${ourUsername}&username2=${partnerUsername}`;
        let localUrl = `http://localhost:5000/private-messages/?username1=${ourUsername}&username2=${partnerUsername}`;

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages));
    }

    return Object.freeze({
        fetchChannelMessages,
        fetchPrivateMessages,
    });
};

export default MessageService;