const MessageService = function() {
    const fetchChannelMessages = (channel_id) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/messages/?channelId=${channel_id}`;
        let localUrl = `http://localhost:5000/messages/?channelId=${channel_id}`;
        
        return fetch(remoteUrl)
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