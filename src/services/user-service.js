const UserService = function (apiService) {

    const checkUsername = username => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/check-username/?username=${username}`;
        let localUrl = `http://localhost:5000/check-username/?username=${username}`;
        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => data.isAvailable);
    };

    const fetchUsernames = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/usernames";
        let localUrl = "http://localhost:5000/usernames";
        return apiService.go(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.usernames));
    };

    const logout = (username) => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/logout";
        let localUrl = "http://localhost:5000/logout";

        const postData = {
            "username": username
        };

        const options = {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return apiService.go(localUrl, options)
            .then(response => response.json())
            .then(data => data.successful);
    }

    return Object.freeze({
       checkUsername,
       fetchUsernames,
       logout,
    });
};

export default UserService;



