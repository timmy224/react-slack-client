const RegisterService = function(apiService) {
    
    const registerUser = (username, password) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/register/post`
        let localUrl = `http://localhost:5000/register/post`

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

        return apiService.go(localUrl, options)
            .then(response => response.json())
    }
    return Object.freeze({
        registerUser
    })
    
};
export default RegisterService;