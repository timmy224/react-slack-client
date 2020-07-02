const RegisterService = function () {
    
    const registerUser = (username, password) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/register/?username=${username}?password=${password}`;
        let localUrl = `http://localhost:5000/register/?username=${username}?password=${password}`;

        const post_data = {
            "username": username,
            "password": password
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
            .then(console.log);
    }
    return Object.freeze({
        registerUser
    })
    
};
export default RegisterService;