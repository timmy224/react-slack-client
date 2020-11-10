import { config } from "../Config";

const ChannelService = function(apiService) {
    const fetchChannels = () => {
        const url = `${config.API_URL}/channel`
        return apiService.go(url)
            .then(response => response.json())
            .then(data => data.channels);
    }

    const createChannel = (channelInfo) => {
        const url = `${config.API_URL}/channel`;
        const post_data = {
            channelInfo,
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return apiService.go(url, options)
            .then(response => response.json())
    };

    const deleteChannel = channelId => {
        const url = `${config.API_URL}/channel`;
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
        return apiService.go(url, options)
            .then(response => response.json())
            .then(data => data.successful)
    };

    const fetchNumberOfMembers = channelId => {
        const url = `${config.API_URL}/channel/members/?channel_id=${channelId}`;
        return apiService.go(url)
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
