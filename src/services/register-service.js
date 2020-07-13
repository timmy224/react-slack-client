const RegisterService = function () {
    
    const registerUser = (username, password) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/register`
        let localUrl = `http://localhost:5000/register`

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
            .then(data => data.isAvailable);
    }
    return Object.freeze({
        registerUser
    })
    
};
export default RegisterService;