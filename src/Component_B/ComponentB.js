import React from "react";
import * as testService from "../services/test-service";

function ComponentB() {
    return (
        <div>
            <h1>Component B</h1>
            <button onClick={() => console.log(testService.getValue())}>Console.log value</button>
            <h2>Value is: {testService.getValue()}</h2>
        </div>
    );
}

export default ComponentB;