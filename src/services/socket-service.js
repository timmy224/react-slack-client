import io from "socket.io-client";

export function connect(dataObject) { 
    let localUrl = "http:localhost:5000"
    let value = dataObject.username
    let query_val = `username=${value}`
    let queryObj = {query: query_val}
    let socket = io(localUrl, queryObj)
    return socket //maybe set this as a parent (app) state property?
}

export function disconnect() {
    // assuming socket declared when connected
    socket.emit("disconnect")
    socket.disconnect()
    return "Socket disconnect sent"
}

export function send(event_name, obj) {
    // assuming socket declared when connected
    socket.emit(event_name, obj)
    console.log(event_name, " with ", obj, " sent.")
}