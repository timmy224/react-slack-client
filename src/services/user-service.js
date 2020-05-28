import * as socketService from "./socket-service";
import * as storageService from "./storage-service";

let username;

export function setUsername(usernameValue) {
    username = usernameValue;
}

export function getUsername() {
    if (username === null) {
        username = storageService.get("username");
    }
    return username;
}

export const checkUsername = (username) => {
    let remoteUrl = `https://react-slack-server.herokuapp.com/check-username/?username=${username}`;
    let localUrl = `http://localhost:5000/check-username/?username=${username}`;
    return fetch(remoteUrl)
        .then(response => response.json())
        .then(data => data.isAvailable);
}

export function joinChat() {
    socketService.connect({username: username});
}

