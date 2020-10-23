import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import CanView from "../CanView/CanView";
import { actions, services } from "../../context";
import { take } from "rxjs/operators";
import ChannelSideBar from "../ChannelSideBar/ChannelSideBar";

const mapStateToProps = (state) => ({
    routePath: state.route.routePath,
    routeState: state.route.routeState,
    username: state.user.username,
    isInitialized: state.main.isInitialized,
    showChannelSideBar: state.channel.showChannelSideBar,
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
        const { isInitialized, showChannelSideBar } = this.props
        return (
            <div>
                {isInitialized ?
                    <div class="container-fluid px-0">                        
                        <div class="row no-gutters">
                            <div class="col-2">
                                <SideBar />
                                <div className="container text-center mt-3">
                                    <button
                                        type="button" class="btn btn-secondary m-1"
                                        onClick={() => this.props.logout()}>Logout</button>
                                </div>
                            </div>
                            <div class="col-9">
                                <Chat />
                            </div>
                            {showChannelSideBar ?
                            <ChannelSideBar />
                            : null
    }
                        </div>
                        <div class="row no-gutters">
                            <div class="col-12">
                                <CanView
                                    resource="org-member"
                                    action="invite"
                                    yes={() => <p>User can invite org members</p>}
                                    no={() => <p>User cannot invite org members</p>}
                                />
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
