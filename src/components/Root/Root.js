import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../../index.css';
import App from './components/App/App';
import AlertUser from "./components/AlertUser/AlertUser";
import Chat from "./components/Chat/Chat";
import EnterUsername from "./components/EnterUsername/EnterUsername";

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}></Route>
            <Route exact path="/alert-user" component={AlertUser}></Route>
            <Route exact path="/chat" component={Chat}></Route>
            <Route exact path="/enter-username" component={EnterUsername}></Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;