import * as SocketService from "./socket-service";

export function setUsername(username) {
    localStorage.setItem("username", username); // Luis
    // Timmy: set client app name to username 
}

export function getUsername() {
    return localStorage.getItem("username")
}

export function joinChat(username_val) {
    let socket = SocketService.connect({username: username_val});

    // look into component lifecycle (want to remove these listeners after join)
    socket.on("connect_error", () => {
        // route to Alert User Component
        return "Connection failure"
    })

    socket.on("connect", () => {
        setUsername(username_val)
        // route to Chat Component 
    })
}

