import * as SocketService from "./socket-service";

export function setUsername(username) {
    localStorage.setItem("username", username); // Luis
    // Timmy: set client app name to username 
}

export function getUsername() {
    return localStorage.getItem("username")
}

export function joinChat(username_val) {
    SocketService.connect({username: username_val});
}

