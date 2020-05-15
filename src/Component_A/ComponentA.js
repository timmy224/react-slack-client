import React from "react";
import * as testService from "../services/test-service";

const increment = () => {
    testService.increment();
    console.log(testService.getValue());
}

function ComponentA() {
    return (
        <div>
            <h1>ComponentA</h1>
            <button onClick={increment}>Increment Value</button>
            <button onClick={() => testService.setValue(1000)}>Set Value to 1000</button>
        </div>
    );
}

export default ComponentA;