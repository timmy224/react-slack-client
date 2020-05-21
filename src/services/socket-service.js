import io from "socket.io-client";
import { Subject } from "rxjs";

let socket;
let connected$ = new Subject();

export const getConnected$ = () => connected$;

export function connect(dataObject) { 
    console.log("Trying to connect");
    let localUrl = "http://localhost:5000"
    let value = dataObject.username
    let query_val = `username=${value}`
    let queryObj = {query: query_val}
    socket = io(localUrl, queryObj)
    setUpEventListeners();
    return socket //maybe set this as a parent (app) state property?
}

function setUpEventListeners() {
	socket.on("connect", () => {
    	connected$.next(true);
    });
	socket.on("connect_error", () => {
		connected$.next(false);
    });
}

function dismantleEventListeners() {
	socket.off("connect");
	socket.off("connect_error");
}

export function disconnect() {
    // assuming socket declared when connected
    socket.emit("disconnect")
    socket.disconnect()
    dismantleEventListeners();
    return "Socket disconnect sent"
}

export function send(event_name, obj) {
    // assuming socket declared when connected
    socket.emit(event_name, obj)
    console.log(event_name, " with ", obj, " sent.")
}