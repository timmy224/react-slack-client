import * as SocketService from "./socket-service";

export function setUsername(username) {
    localStorage.setItem("username", username);
}

export function getUsername() {
    return localStorage.getItem("username")
}

export function joinChat(username_val) {
    let socket = SocketService.connect({username: username_val});

    socket.on("connect_error", () => {
        // route to Alert User Component
        return "Connection failure"
    })

    socket.on("connect", () => {
        setUsername(username_val)
        // route to Chat Component 
    })
}

