import React, { Fragment } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService
import { services } from "../../context";
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
    createChannel: actions.channel.createChannel,
    takenChannelName: actions.channel.takenChannelName,
    changeRoute: actions.route.changeRoute,
}

class CreateChannel extends React.Component {
    handleSubmit = (event) => {
        const { channel_name, takenChannelName, changeRoute } = this.props
        event.preventDefault();
        services.channelService.createChannel(channel_name)
        .then(data => {
            if (data.successful){
                 changeRoute({path:"/main"})
        }
            else if(data.ERROR == "Channel name is taken"){
                return takenChannelName
            }
    })
         
        .catch(err => console.log(err));
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
                <h1>Create Channel</h1>
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