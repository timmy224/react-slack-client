const ChannelService = function() {
    const fetchChannels = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channels";
        let localUrl = "http://localhost:5000/channels";

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.channels));
    
    }

    const fetchChannelMessages = (channel_id) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/messages/?channelId=${channel_id}`;
        let localUrl = `http://localhost:5000/messages/?channelId=${channel_id}`;
        // console.log(fetch(localUrl)
        //     .then(response => response.json())
        //     .then(data => JSON.parse(data.messages)))

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.messages));
    }

    //console.log(fetchChannels())
    return Object.freeze({
        fetchChannels, 
        fetchChannelMessages
    });
};

export default ChannelService;

