import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import Can from "../Can/Can";
import { actions, services } from "../../context";
import { take } from "rxjs/operators";

const mapStateToProps = (state) => ({
    routePath: state.route.routePath,
    routeState: state.route.routeState,
    username: state.user.username,
    isInitialized: state.main.isInitialized,
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
        const { isInitialized } = this.props
        return (
            <div>
                {isInitialized ?
                    <div>
                        <Chat />
                        <SideBar />
                        <Can
                            resource="org-member"
                            action="invite"
                            yes={() => <p>User can invite org members</p>}
                            no={() => <p>User cannot invite org members</p>}
                        />
                        <button onClick={() => this.props.logout()}>Logout</button>
                        <button onClick={() => this.props.changeRoute({ path: "/create-channel" })}>Create channel -></button>
                        <button onClick={() => this.props.changeRoute({ path: "/cookie-demo" })}>Cookie demo -></button>
                    </div>
                    : null}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
