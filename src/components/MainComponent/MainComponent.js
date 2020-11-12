import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import Orgs from "../Orgs/Orgs";
import SideBar from "../SideBar/SideBar";
import CanView from "../CanView/CanView";
import { actions, services } from "../../context";
import { take } from "rxjs/operators";
import "./MainComponent.css"

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
            <div className="main">
                {isInitialized ?
                    <div className="container-fluid px-0 background-view">                        
                        {/* <div className="row no-gutters">
                            <div className="col-3">
                                <CanView
                                    resource="org-member"
                                    action="invite"
                                    yes={() => <p>User can invite org members</p>}
                                    no={() => <p>User cannot invite org members</p>}
                                />
                            </div>
                            <div className='col-9'>
                                <CanView
                                    resource="channel-member"
                                    action="add"
                                    yes={() => <p>User can add channel members</p>}
                                    no={() => <p>User cannot add channel members</p>}
                                />
                            </div>
                        </div> */}
                        <div className="row main-wrapper">
                            <div >
                                <Orgs />
                            </div>
                            <div className="sidebar-wrapper">
                                <SideBar />
                            </div>
                            <div className="chat-wrapper">
                                <Chat />
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
