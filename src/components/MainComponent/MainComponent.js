import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import CreateChannel from "../CreateChannel/CreateChannel";
import { actions, services } from "../../context";
import { take } from "rxjs/operators";

const mapStateToProps = (state) => ({
    routePath: state.route.routePath,
    routeState: state.route.routeState,
    username: state.user.username,
});

const mapActionsToProps = {
    initMain: actions.main.initMain,
    changeRoute: actions.route.changeRoute,
    logout: actions.user.logout,
};


class MainComponent extends Component {
    componentDidMount() {
        if (!services.socketService.getConnected()) {
            this.setupConnectedSubscription();
            const username = this.props.username ? this.props.username : services.storageService.get("username");
            services.socketService.connect({ username: username });
    }
      this.props.initMain();
  }

    setupConnectedSubscription() {
        const { changeRoute } = this.props
        services.socketService.getConnected$()
        .pipe(take(1))
        .subscribe(connected => {
            if (!connected) {
                changeRoute({ path: "/alert-user", routeState: { alert: "Web socket connection error " } });
        }
      });
  }

  render() {
    return (
      <div class="container">
            <div class="row">
                <div class="col-3">
                    <SideBar />
                    <div className = "container text-center mt-3">
                        <button 
                        type="button" class="btn btn-secondary m-1"
                        onClick={() => this.props.logout()}>Logout</button>
                        <button 
                        type="button" class="btn btn-secondary m-1"
                        onClick={() => this.props.changeRoute({ path: "/cookie-demo" })}>Cookie demo -></button>
                        <CreateChannel />
                    </div>
                </div>
                <div class="col-9">
                    <Chat />
                </div>
            </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
