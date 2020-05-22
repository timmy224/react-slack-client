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

export function joinChat() {
    socketService.connect({username: username});
}

