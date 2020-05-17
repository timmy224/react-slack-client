import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import SocketService from './services/socket-service';


console.log(1);
const socket = io("http://localhost:5000");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <SocketService />
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
