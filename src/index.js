import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// router imports
import { BrowserRouter as Router, Route } from "react-router-dom";
import AlertUser from "./Component/AlertUser";
import Chat from "./Component/Chat";
import EnterUsername from "./Component/EnterUsername";

const createRoutes = () => (
  <Router>
    <Route exact path="/" component={App}></Route>
    <Route exact path="/alert-user" component={AlertUser}></Route>
    <Route exact path="/chat" component={Chat}></Route>
    <Route exact path="/enter-username" component={EnterUsername}></Route>
  </Router>
);

const routes = createRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
