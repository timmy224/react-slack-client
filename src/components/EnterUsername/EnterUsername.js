import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { take } from "rxjs/operators";
import { actions } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        username:state.userModule.username,
        showTakenMsg: state.userModule.showTakenMsg,
        routePath: state.routeModule.routePath,
        routeState: state.routeModule.routeState,
    }
}
const mapDispatchToProps = (dispatch)=>{
   return {
    firstTimeUser: (event) => dispatch(actions.userModule.setUsername(event.target.value)),
    pathToChat:() => dispatch(actions.routeModule.changeRoute("/chat")),
    pathToAlert:()=>dispatch(actions.routeModule.routeToAlert("/alert-user")),
    naUsername:()=>dispatch(actions.userModule.takenUsername(false)),
    }
}

class EnterUsername extends React.Component {

    componentDidMount() {
        this.setupConnectedSubscription();
    }
    
    setupConnectedSubscription() {
        const { pathToChat, pathToAlert } = this.props
        services.socketService.getConnected$()
        .pipe(take(1))
        .subscribe(connected => {
            if (connected) {
                pathToChat();
            } else {
                pathToAlert();
            }
        });
    }

    handleSubmit = (event) => {
        const { username, naUsername } = this.props
        console.log('username is:', username)
        event.preventDefault();
        services.userService.checkUsername(username).then(isAvailable => {
            if (isAvailable) {
                services.storageService.set("username", username);
                services.socketService.connect({ username: username });
            } else {
                naUsername();
            }
        });
    }

    render() {
        const { firstTimeUser, showTakenMsg } = this.props;
        // if (routePath)  {
        //    return <Redirect to={{ pathname: routePath, 
        //         state: routeState }} />;
        //}
             // console.log('inside_EnterUsername_Conditional:', pathname, state)      
        
        const takenMessage = showTakenMsg ? <h3>Username taken</h3> : null;
        return (
            <Fragment>
                {takenMessage}
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={firstTimeUser} 
                        />
                    <button type='submit'>Submit!</button>
                </form>
            </Fragment>            
        );
    }




}

export default connect(mapStateToProps, mapDispatchToProps)(EnterUsername);