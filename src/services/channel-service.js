const ChannelService = function(apiService) {
    const fetchChannels = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channel";
        let localUrl = "http://localhost:5000/channel";

        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => data.channels);
    }

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

    const fetchNumberOfMembers = channelId => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/channel/members/?channel_id=${channelId}`;
        let localUrl = `http://localhost:5000/channel/members/?channel_id=${channelId}`;

        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => data.num_members);
    }

    return Object.freeze({
        fetchChannels, 
        createChannel,
        deleteChannel,
        fetchNumberOfMembers
    });
};

export default ChannelService;
