import React, { Component, Fragment } from "react";
import { actions, services } from "../../../context";

const mapStateToProps = (state) => ({
    routePath: state.route.routePath,
    routeState: state.route.routeState,
});

const mapActionsToProps = {
    changeRoute: actions.route.changeRoute
};

class CookieDemo extends Component {
    getCookie() {
        services.demoService.getCookie()
            .then(resp => console.log("Response received!"))
            .catch(err => console.log(err));
    }

    sendCookie() {
        services.demoService.sendCookie()
            .then(resp => console.log("Response received!"))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <Fragment>
                <h1>Cookie Demo</h1>
                <button onClick={this.getCookie}>Get cookie</button>
                <button onClick={this.sendCookie}>Send cookie</button>
            </Fragment>
        );
    }
};

export default CookieDemo;