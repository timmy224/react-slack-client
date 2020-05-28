const ChannelService = function() {
    const fetchChannels = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channels";
        let localUrl = "http://localhost:5000/channels";
        return fetch(remoteUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.channels));
    }

    return Object.freeze({
        fetchChannels, 
    });
};

export default ChannelService;

