import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import CreateChannel from "../CreateChannel/CreateChannel"
import { actions } from "../../context";

const mapStateToProps = (state) => ({
    routePath: state.route.routePath,
    routeState: state.route.routeState,
});

const mapActionsToProps = {
    initMain: actions.main.initMain,
    changeRoute: actions.route.changeRoute,
};

class MainComponent extends Component {
    componentDidMount() {
        this.props.initMain();
    }

    render() {
        return (
            <div>
                <Chat />
                <CreateChannel />
                <SideBar />
                <button onClick={() => this.props.changeRoute({path: "/cookie-demo"})}>Cookie demo -></button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
