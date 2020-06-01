const ChannelService = function () {
  const fetchChannels = () => {
    let remoteUrl = "https://react-slack-server.herokuapp.com/channels";
    let localUrl = "http://localhost:5000/channels";
    return fetch(remoteUrl)
      .then((response) => response.json())
      .then((data) => JSON.parse(data.channels));
  };
  const fetchMessages = (channelId) => {
    let channelUrl =
      "https://react-slack-server.herokuapp.com/messages/?channelId=${channelId}";
    return fetch(channelUrl)
      .then((response) => response.json())
      .then((data) => JSON.parse(data.messages));
  };

  return Object.freeze({
    fetchChannels,
    fetchMessages,
  });
};

export default ChannelService;
