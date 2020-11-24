import { config } from "../Config";

const ChannelService = function(apiService) {
    const createChannel = (channel_info) => {
        const url = `${config.API_URL}/channel`;
        const post_data = {
            channel_info,
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

    const deleteChannel = (orgName, channelName) => {
        const url = `${config.API_URL}/channel`;
        const delete_data = {
            "org_name": orgName,
            "channel_name": channelName,
        };
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
        createChannel,
        deleteChannel,
        fetchNumberOfMembers
    });
};

export default ChannelService;
