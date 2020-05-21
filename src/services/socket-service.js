import io from "socket.io-client";

let socket; 

export function connect(dataObject) { 
    let localUrl = "http:localhost:5000"
    let value = dataObject.username
    let query_val = `username=${value}`
    let queryObj = {query: query_val}
    socket = io(localUrl, queryObj)
    return socket //maybe set this as a parent (app) state property?
}

export function getSocket() {
    return socket;
}

export function send(event_name, obj) {
    // assuming socket declared when connected
    socket.emit(event_name, obj)
    console.log(event_name, " with ", obj, " sent.")
}

export function disconnect() {
    // assuming socket declared when connected
    socket.emit("disconnect")
    socket.disconnect()
    return "Socket disconnect sent"
}

export function setSocketListeners() {
    socket.on('message-catchup', (messages) => {
        console.log(`Message Catchup: ${messages.messages}`);
        return messages
    })

    socket.on('user-joined-chat', (user_join) => {
        console.log(`User joined the chat: ${user_join.username}`);
        return user_join
    })

    socket.on('message-received', (message_received) => {
        console.log(
            `Sender: ${message_received.sender},
             Time Sent: ${message},
             Content: ${message_received.content}`
        );
        return message_received
    })
}


