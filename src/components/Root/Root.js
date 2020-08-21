import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {HashRouter} from "react-router-dom"
import "../../index.css";
import App from "../App/App";
import AlertUser from "../AlertUser/AlertUser";
import CreateChannel from "../CreateChannel/CreateChannel";
import MainComponent from "../MainComponent/MainComponent";
import Register from "../Register/Register";
import Login from "../Login/Login";
import CookieDemo from "../Demos/CookieDemo/CookieDemo";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Route path="/" component={App}></Route>
      <Route exact path="/alert-user" component={AlertUser}></Route>
      <Route path="/main" component={MainComponent}></Route>
      <Route exact path="/create-channel" component={CreateChannel}></Route>
      <Route exact path= "/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/cookie-demo" component={CookieDemo}></Route>
    </HashRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
