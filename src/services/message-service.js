const MessageService = function() {
    const fetchChannelMessages = channelId => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/channel-messages/?channelId=${channelId}`;
        let localUrl = `http://localhost:5000/channel-messages/?channelId=${channelId}`;
        
        return fetch(localUrl)
            .then(response => response.json())
            //.then(data => JSON.parse(data.messages)); 
            // don't need to parse since obj is returned not JSON string
    };

    const fetchPrivateMessages = (ourUsername, partnerUsername) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/private-messages/?username1=${ourUsername}&username2=${partnerUsername}`;
        let localUrl = `http://localhost:5000/private-messages/?username1=${ourUsername}&username2=${partnerUsername}`;

        return fetch(localUrl)
            .then(response => response.json())
            // .then(data => JSON.parse(data.messages));
            // test if object is returned (whether it needs parsing)
    }

    return Object.freeze({
        fetchChannelMessages,
        fetchPrivateMessages,
    });
};

export default MessageService;