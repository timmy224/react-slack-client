const UserService = function (apiService) {

    const fetchUsernames = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/user/usernames";
        let localUrl = "http://localhost:5000/user/usernames";
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
       fetchUsernames,
       logout,
    });
};

export default UserService;



