import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { take } from "rxjs/operators";
import { actions } from "../../context";

class CreateChannel extends React.Component {
    handleSubmit = (event) => {
        const { channel_name, takenChannelName, changeRoute, fetchChannels } = this.props
        console.log('Channel Name is:', channel_name)
        event.preventDefault();
        services.channelService.checkChannelName(channel_name).then(isAvailable => {
            if (isAvailable) {
                services.channelService.createChannel(channel_name);
                changeRoute({path:"/main"});
            } else {
                takenChannelName(true);
            }
        });
    }

    handleChange = (event) =>{
        let channel_name = event.target.value
        return this.props.createChannel(channel_name)
    }

    render() {
        const { show_taken_msg } = this.props;
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

const mapStateToProps = (state)=>{
    return { 
        channel_name: state.channel.channel_name,
        show_taken_msg: state.channel.show_taken_msg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
    }
}
const mapActionsToProps = {
    createChannel: actions.channel.createChannel,
    takenChannelName: actions.channel.takenChannelName,
    changeRoute: actions.route.changeRoute,
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);