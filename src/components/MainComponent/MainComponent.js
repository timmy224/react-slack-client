import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import { actions } from "../../context";
import { services } from "../../context";
import { take } from "rxjs/operators";

const mapStateToProps = (state) => ({
    routePath: state.route.routePath,
    routeState: state.route.routeState,
    username: state.user.username,
});

const mapActionsToProps = {
  initMain: actions.main.initMain,
  changeRoute: actions.route.changeRoute,
};


class MainComponent extends Component {
  componentDidMount() {
    this.setupConnectedSubscription();
    services.socketService.connect({ username: this.props.username });
    this.props.initMain();
  }

  setupConnectedSubscription() {
    const { changeRoute } = this.props
    services.socketService.getConnected$()
    .pipe(take(1))
    .subscribe(connected => {
        if (!connected) {                    
            changeRoute({path:"/alert-user", routeState:{alert: "Web socket connection error "}});
        }
    });  
}

  render() {
    return (
      <div>
        <Chat />
        <SideBar />
        <button onClick={() => this.props.changeRoute({path: "/cookie-demo"})}>Cookie demo -></button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
