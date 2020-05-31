const UserService = function (storageService) {

    const checkUsername = username => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/check-username/?username=${username}`;
        let localUrl = `http://localhost:5000/check-username/?username=${username}`;
        return fetch(remoteUrl)
            .then(response => response.json())
            .then(data => data.isAvailable);
    };

    return Object.freeze({
       checkUsername,
    });
};

export default UserService;



