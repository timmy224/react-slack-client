const LoginService = function () {

    const checkPassword = (password)=>{
        let remoteUrl = `https://react-slack-server.herokuapp.com/check-password/?password=${password}`;
        let localUrl = `http://localhost:5000/check-password/?password=${password}`;

        return fetch(localUrl)
            .then(response => response.json())
            .then(data => data.isCorrect);
    };
    const loginUser = (username, password) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/login/`
        let localUrl = `http://localhost:5000/login/`

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
        checkPassword,
       loginUser,
    });
};

export default LoginService;