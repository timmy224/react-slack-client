const MessageService = function() {
    const fetchChannelMessages = channelId => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/messages/?channelId=${channelId}`;
        let localUrl = `http://localhost:5000/messages/?channelId=${channelId}`;
        
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
    const sendTestMessage = ()=>{
        let localUrl = 'http://localhost:5000/echo/';

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return Object.freeze({
        fetchChannelMessages,
        fetchPrivateMessages,
        sendTestMessage
    });
};

export default MessageService;