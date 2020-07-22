const ChannelService = function(apiService) {
    const fetchChannels = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channels";
        let localUrl = "http://localhost:5000/channels";

        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => data.channels);
    }

    const checkChannelName = channelName => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/check-channel-name";
        let localUrl = "http://localhost:5000/check-channel-name";

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

    const createChannel = channelName => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/create-channel";
        let localUrl = "http://localhost:5000/create-channel";

        const post_data = {
            "channel_name": channelName,
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

    const deleteChannel = channel_id => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/delete-channel/`;
        let localUrl = `http://localhost:5000/delete-channel/`

        const delete_data ={
            "channel_id": channel_id,
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

    //console.log(fetchChannels())
    return Object.freeze({
        fetchChannels, 
        checkChannelName,
        createChannel,
        deleteChannel
    });
};

export default ChannelService;
