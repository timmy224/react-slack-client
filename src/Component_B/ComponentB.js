import React, { Component } from "react";
import * as testService from "../services/test-service";

class ComponentB extends Component {

    state = {value: testService.getValue()};

    componentDidMount() {
        testService.getValue$().subscribe(newValue => {
            console.log("Recived a new value through the value stream");
            console.log(newValue);
            this.setState({value: newValue});
        });
    }

    render() {
        return (
            <div>
                <h1>Component B</h1>
                <button onClick={() => console.log(testService.getValue())}>Console.log value</button>
                <h2>Value is: {this.state.value}</h2>
            </div>
        );
    }
}

export default ComponentB;