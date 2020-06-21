const UserService = function (storageService) {

    const checkUsername = username => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/check-username/?username=${username}`;
        let localUrl = `http://localhost:5000/check-username/?username=${username}`;
        return fetch(localUrl)
            .then(response => response.json())
            .then(data => data.isAvailable);
    };

    const fetchUsernames = () => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/usernames";
        let localUrl = "http://localhost:5000/usernames";
        return fetch(localUrl)
            .then(response => response.json())
            .then(data => JSON.parse(data.usernames));
    };

    const sendUserInfo = (userInfo) => {
        let remoteUrl = "https://react-slack-server.herokuapp.com/send-user-info";
        let localUrl = "http://localhost:5000/send-user-info";

        // post data
        const post_data = {
            "user_info": userInfo,
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
    }

    return Object.freeze({
       checkUsername,
       fetchUsernames,
       sendUserInfo,
    });
};

export default UserService;



