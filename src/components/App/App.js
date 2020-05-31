import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./App.css";
// Depends on storageService, userService, socketService
import { services } from "../../context";
import { take } from "rxjs/operators";
import { actions } from "../../context";

const mapStateToProps = (state) => {
  // console.log('in App.js state:', state)
  return {
    username: state.userModule.username,
    routePath: state.userModule.routePath,
    routeState: state.userModule.routeState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    routeToEnterUsername: () =>
      dispatch(actions.userModule.changeRoute("/enter-username")),
    routeToMain: () => dispatch(actions.userModule.changeRoute("/main")),
    pathToAlert: () => dispatch(actions.userModule.routeToAlert("/alert-user")),
    setUsername: () => dispatch(actions.userModule.setUsername()),
  };
};

class App extends Component {
  componentDidMount() {
    const { routeToEnterUsername, setUsername } = this.props;
    let username = services.storageService.get("username");
    console.log("Username is: ", username);
    let isNewUser = username === null;
    if (isNewUser) {
      routeToEnterUsername();
    } else {
      this.setupConnectedSubscription();

      setUsername(username);
      services.socketService.connect({ username: username });
    }
  }

  setupConnectedSubscription() {
    const { routeToMain, pathToAlert } = this.props;
    services.socketService
      .getConnected$()
      .pipe(take(1)) // TODO learn what this does
      .subscribe((connected) => {
        if (connected) {
          console.log("Successful connection!");
          routeToMain();
        } else {
          pathToAlert();
        }
      });
  }

  render() {
    const { routePath, routeState } = this.props;
    if (!routePath) {
      return <h1>Loading....</h1>;
    } else {
      return <Redirect to={{ pathname: routePath, state: routeState }} />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
