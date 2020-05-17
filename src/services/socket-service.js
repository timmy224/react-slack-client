import React from "react";
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

class SocketService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "hello",
        }
        this.connectTest = this.connectTest.bind(this);
    }

    connectTest() {
        socket.on('connect', () => {
            console.log('connected')
            console.log('New initial connection');
            console.log();
        })
        this.setState({
            name: "bye"
        })

    }

    render() {
        return (
            <div>
                {this.state.name}
            </div>
        )
    }
}

export default SocketService