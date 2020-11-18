import { config } from "../Config";

const ChannelService = function(apiService) {
    const fetchChannels = () => {
        const url = `${config.API_URL}/channel`
        return apiService.go(url)
            .then(response => response.json())
            .then(data => data.channels);
    }

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

    const fetchMemberNames = channelName =>{
        const url = `${config.API_URL}/channel/users/`;
        const post_data = {
            action: "GET",
            channel_name: channelName
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
            .then(data => JSON.parse(data.channel_members));
    }

    const addChannelMember = (channelName, addMember) => {
        const url = `${config.API_URL}/channel/users/`;
        const post_data = {
            action: "STORE",
            channel_name: channelName,
            new_member_username: addMember
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
            .then(data => data.successful)
    }

    const removeChannelMember = (channelName, removeMember) => {
        const url = `${config.API_URL}/channel/users/`;
        const post_data = {
            channel_name: channelName,
            removed_username: removeMember
        }
        const options = {
            method: "DELETE",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        
    }
    return apiService.go(url, options)
            .then(response => response.json())
            .then(data => data.successful)
    }

    return Object.freeze({
        fetchChannels, 
        createChannel,
        deleteChannel,
        fetchNumberOfMembers,
        fetchMemberNames,
        addChannelMember,
        removeChannelMember
    });
};

export default ChannelService;
