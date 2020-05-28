const ChannelService = function() {
    const getChannels = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channels";
        let localUrl = "http://localhost:5000/channels";
        return fetch(remoteUrl)
            .then(response => response.json())
            .then(data => data.channels);
    }

    return Object.freeze({
       getChannels, 
    });
};

export default ChannelService;

