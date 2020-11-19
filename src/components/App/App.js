import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./App.css";
// Depends on storageService, userService, socketService
import { services } from "../../context";
import { actions } from "../../context";

const mapStateToProps = (state) => {
  return {
    routePath: state.route.routePath,
    routeState: state.route.routeState,
  };
};

const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    changeRoute: actions.route.changeRoute,
}

class App extends Component {
    componentDidMount() {
        const { changeRoute, setUsername } = this.props;
        let username = services.storageService.get("username");
        let isNewUser = username === null;
        if (isNewUser) {
          changeRoute({path:'/login'});
        }
        else {
          setUsername(username);
          changeRoute({path:'/main'});
        }
    }
    
  render() {
    const { routePath, routeState } = this.props;
    if (!routePath) {
      return <h1>Loading....</h1>;
    } else {
      return <Redirect to={{pathname: routePath, state: routeState }} />;
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(App);
