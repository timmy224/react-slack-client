
export const checkUsername = (username) => {
    return fetch(`https://react-slack-server.herokuapp.com/check-username/?username=${username}`)
        .then(response => response.json())
        .then(data => data.isAvailable);
}