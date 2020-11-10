import { config } from "../Config";

const UserService = function (apiService) {
    const fetchUsernames = () => {
        const url = `${config.API_URL}/user/usernames`;
        return apiService.go(url)
            .then(response => response.json())
            .then(data => JSON.parse(data.usernames));
    };

    const logout = (username) => {
        const url = `${config.API_URL}/logout`;
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
        return apiService.go(url, options)
            .then(response => response.json())
            .then(data => data.successful);
    }

    return Object.freeze({
       fetchUsernames,
       logout,
    });
};

export default UserService;



