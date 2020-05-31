const ChannelService = function() {
    const fetchChannelIDs = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channels";
        let localUrl = "http://localhost:5000/channels";

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.channels));
    }

    const fetchMessagesChannel = (channel_id) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/messages/?channelId=${channel_id}`;
        let localUrl = `http://localhost:5000/messages/?channelId=${channel_id}`;
        
        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages));
    }

    //console.log(fetchChannels())
    return Object.freeze({
        fetchChannelIDs, 
        fetchMessagesChannel
    });
};

export default ChannelService;

