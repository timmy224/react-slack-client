import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import CreateChannel from "../CreateChannel/CreateChannel"
import { actions, services } from "../../context";

class MainComponent extends Component {
  componentDidMount() {
      this.props.initMain();
  }

  handleClick() {
    services.socketService.send("request-ping", "ping-request")
  }

  render() {
    return (
      <div>
        <Chat />
        <CreateChannel />
        <SideBar />
        <button onClick={this.handleClick.bind(this)}>Ping-Pong</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionsToProps = {
    initMain: actions.main.initMain,

};

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
