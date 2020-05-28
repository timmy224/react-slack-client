import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
// router imports
import { BrowserRouter as Router, Route } from "react-router-dom";
import AlertUser from "./components/AlertUser/AlertUser";
import Chat from "./components/Chat/Chat";
import EnterUsername from "./components/EnterUsername/EnterUsername";

const createRoutes = () => (
  <Router>
    <Route path="/" component={App}></Route>
    <Route exact path="/alert-user" component={AlertUser}></Route>
    <Route exact path="/chat" component={Chat}></Route>
    <Route exact path="/enter-username" component={EnterUsername}></Route>
  </Router>
);

const routes = createRoutes();

// TODO - find out what removed <React.StrictMode> does
ReactDOM.render(
  routes,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
