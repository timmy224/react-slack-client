const ChallengeService = function () {
    
    const ChallengeUser = (name, username, email) => {
        let remoteUrl = `https://react-slack-server.herokuapp.com/challenge`
        let localUrl = `http://localhost:5000/challenge`

        const post_data = {
            "name": name,
            "username": username,
            "email": email
        }

        const options = {
            method: "POST",
            body: JSON.stringify(post_data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return fetch(localUrl, options)
            .then(response => response.json()
            .then(data => console.log(data.succesful) ))
    }
    return Object.freeze({
        ChallengeUser
    })
    
};
export default ChallengeService;