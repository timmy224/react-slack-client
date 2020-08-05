import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import { actions, services } from "../../context";

class MainComponent extends Component {
  componentDidMount() {
      this.props.initMain();
  }
pingy(){
  services.socketService.send("pingy-test", "pingy-test")
}
  render() {
    return (
      <div>
        <Chat />
        <SideBar />
        <button onClick={this.pingy.bind(this)}>PingyPongy</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionsToProps = {
    initMain: actions.main.initMain,
};

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
