import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { take } from "rxjs/operators";
import { actions } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        showTakenMsg: state.user.showTakenMsg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
    }
}
const mapActionsToProps = {
    setUsername:actions.user.setUsername,
    takenUsername:actions.user.takenUsername,
    changeRoute:actions.route.changeRoute,
}

class EnterUsername extends React.Component {

    componentDidMount() {
        this.setupConnectedSubscription();
    }
    
    setupConnectedSubscription() {
        const { changeRoute } = this.props
        services.socketService.getConnected$()
        .pipe(take(1))
        .subscribe(connected => {
            if (connected) {
                changeRoute({path:"/chat"});
            } else {
                changeRoute({path:"/alert-user",routeState:{alert: "Web socket connection error "}});
            }
        });
    }

    handleSubmit = (event) => {
        const { username, takenUsername } = this.props
        console.log('username is:', username)
        event.preventDefault();
        services.userService.checkUsername(username).then(isAvailable => {
            if (isAvailable) {
                services.storageService.set("username", username);
                services.socketService.connect({ username: username });
            } else {
                takenUsername(true);
            }
        });
    }

    handleChange = (event) =>{
        let username = event.target.value
        return this.props.setUsername(username)

    }

    render() {
        const {  showTakenMsg } = this.props;
        // if (routePath)  {
        //    return <Redirect to={{ pathname: routePath, 
        //         state: routeState }} />;
        //}    
        
        const takenMessage = showTakenMsg ? <h3>Username taken</h3> : null;
        return (
            <Fragment>
                {takenMessage}
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange} 
                        />
                    <button type='submit'>Submit!</button>
                </form>
            </Fragment>            
        );
    }




}

export default connect(mapStateToProps, mapActionsToProps)(EnterUsername);