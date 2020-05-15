import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ComponentA from "./Component_A/ComponentA";
import ComponentB from "./Component_B/ComponentB";
// import * as testService from "./services/test-service";

// console.log(testService.getValue());
// testService.setValue(6);
// console.log(testService.getValue());

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ComponentA />
        <ComponentB />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
