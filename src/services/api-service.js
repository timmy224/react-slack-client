
export const checkUsername = (username) => {
    let remoteUrl = `https://react-slack-server.herokuapp.com/check-username/?username=${username}`;
    let localUrl = `http://localhost:5000/check-username/?username=${username}`;
    return fetch(remoteUrl)
        .then(response => response.json())
        .then(data => data.isAvailable);
}

export const echoMessage = (message) => {
    let localUrl = `http://localhost:5000/echo?message=${message}`
    return fetch(localUrl)
        .then(response => response.json())
}