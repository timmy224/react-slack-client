import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { take } from "rxjs/operators";
import { actions } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        channel_name: state.channel.channel_name,
        show_taken_msg: state.channel.show_taken_msg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
    }
}
const mapActionsToProps = {
    setChannelName: actions.channel.setChannelName,
    takenChannelName: actions.channel.takenChannelName,
    changeRoute: actions.route.changeRoute,
    fetchChannels: actions.channel.fetchChannelIDs,
}

class CreateChannel extends React.Component {

    componentDidMount() {
        this.setupConnectedSubscription();
    }
    
    setupConnectedSubscription() {
        const { changeRoute } = this.props
        services.socketService.getConnected$()
        .pipe(take(1))
        .subscribe(connected => {
            if (connected) {
                changeRoute({path:"/main"});
            } else {
                changeRoute({path:"/alert-user",routeState:{alert: "Web socket connection error "}});
            }
        });
    }

    handleSubmit = (event) => {
        const { channel_name, takenChannelName, changeRoute, fetchChannels } = this.props
        console.log('Channel Name is:', channel_name)
        event.preventDefault();
        services.channelService.checkChannelName(channel_name).then(isAvailable => {
            console.log('is available:', isAvailable)
            if (isAvailable) {
                console.log("is available True")
                services.channelService.setChannelName(channel_name);
                changeRoute({path:"/main"});
                fetchChannels();
            } else {
                takenChannelName(true);
            }
        });
    }

    handleChange = (event) =>{
        let channel_name = event.target.value
        return this.props.setChannelName(channel_name)

    }

    render() {
        const { show_taken_msg } = this.props;
        // if (routePath)  {
        //    return <Redirect to={{ pathname: routePath, 
        //         state: routeState }} />;
        //}    
        
        const takenMessage = show_taken_msg ? <h3>Channel Name taken</h3> : null;
        return (
            <Fragment>
                <h1>Create Channel Component (cloned EnterUsername Component)</h1>
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

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);