const ChannelService = function(apiService) {
    const fetchChannels = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channel";
        let localUrl = "http://localhost:5000/channel";

        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => data.channels);
    }

    const checkChannelName = channelName => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channel/name-available";
        let localUrl = "http://localhost:5000/channel/name-available";

        const post_data = {
            "channel_name": channelName
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(localUrl, options)
            .then(response => response.json())
            .then(data => data.isAvailable);
    };

    const createChannel = (channelInfo) => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channel";
        let localUrl = "http://localhost:5000/channel";

        const post_data = {
            "channel_info": channelInfo,
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(localUrl, options)
            .then(response => response.json())
            .then(data => data.successful);
    };

    const deleteChannel = channelId => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/channel`;
        let localUrl = "http://localhost:5000/channel"

        const delete_data ={
            "channel_id": channelId,
        }
        const options = {
            method: "DELETE",
            body: JSON.stringify(delete_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(localUrl, options)
            .then(response => response.json())
            .then(data => data.successful)
    };

    return Object.freeze({
        fetchChannels, 
        checkChannelName,
        createChannel,
        deleteChannel
    });
};

export default ChannelService;
