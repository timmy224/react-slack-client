const ChannelService = function() {
    const fetchChannelIDs = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/channels";
        let localUrl = "http://localhost:5000/channels";

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.channels));
    }

    const checkChannelName = channel_name => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/check-channel-name/?channel_name=${channel_name}`;
        let localUrl = `http://localhost:5000/check-channel-name/?channel_name=${channel_name}`;

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => data.isAvailable);
    };

    const createChannel = channel_name => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/create-channel/?channel_name=${channel_name}`;
        let localUrl = `http://localhost:5000/create-channel/?channel_name=${channel_name}`;

        // post data
        const post_data = {
            "channel_name": channel_name,
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return fetch(localUrl, options)
            .then(response => response.json())
            .then(data => data.isAvailable);
    }
    //console.log(fetchChannels())
    return Object.freeze({
        fetchChannelIDs, 
        checkChannelName,
        createChannel,
    });
};

export default ChannelService;
