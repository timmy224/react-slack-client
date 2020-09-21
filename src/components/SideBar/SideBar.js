import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services, store } from "../../context";
import Button from 'react-bootstrap/Button';
import CreateChannel from "../CreateChannel/CreateChannel";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown } from "@fortawesome/free-solid-svg-icons";

class SideBar extends Component {
    selectChannel = (event) => {
        this.props.selectChannel(event.target.value);
    }
    selectUser = (event) => {
        this.props.selectUser(event.target.value);
    }
    handleDelete = (event) => {
        let channel_id = event.target.value
        services.channelService.deleteChannel(channel_id).catch(err => console.log(err));
    }

    render() {
        const { channels, usernames, handleShow } = this.props;
        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.entries(channels).map(([channel_id, channel]) => 
                <div key={channel.channel_id}>
                    <button
                        type="button" 
                        class="btn btn-dark m-1"
                        value={channel.channel_id}
                        onClick={this.selectChannel}>
                        {channel.name}
                    </button>
                    <button
                        type="button" 
                        class="btn btn-danger m-1"
                        value={channel.channel_id}
                        onClick={this.handleDelete}
                        >delete
                    </button>
                </div>
                ));
        let usernamesDisplay = !usernames.length ?
                <h2>Loading users...</h2>
                : (usernames.map(username => 
                    <button 
                    type="button" 
                    class="btn btn-light m-1"
                    value={username}
                    onClick={this.selectUser}
                    key={username}>
                        {username}
                    </button>))
        return (
            <div className="sidebar">
                <div className="sidebar-section-heading">
                    <span class="sidebbar-section-heading-expand">
                        <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                    </span>                    
                    <button class="sidebar-section-heading-label unstyled-button">Channels</button>
                    <div class="sidebar-section-heading-right">
                        <button class="unstyled-button" onClick={()=>handleShow(true)}>
                            <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" />
                        </button>
                    </div>                               
                </div>
                <CreateChannel />
                <div className="container text-center">
                    {channelsDisplay}
                </div>
                <div className="sidebar-section-heading">
                    <span class="sidebbar-section-heading-expand">
                        <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                    </span>                    
                    <button class="sidebar-section-heading-label unstyled-button">Direct messages</button>
                    <div class="sidebar-section-heading-right">
                        <button class="unstyled-button">
                            <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" />
                        </button>
                    </div>                               
                </div>
                <div className="container text-center" style={{border:'2px solid black'}}>
                    {usernamesDisplay}
                </div>
            </div>
            
        )
    
    };
}

const mapStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        usernames: state.user.usernames,
    };
};

const mapActionsToProps = {
    selectChannel: actions.sidebar.selectChannel,
    selectUser: actions.sidebar.selectUser,
    handleShow: actions.channel.showModal,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);