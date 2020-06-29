import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import { actions } from "../../context";

class MainComponent extends Component {
  componentDidMount() {
      this.props.initMain();
  }

  render() {
    return (
      <div>
        <Chat />
        <SideBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionsToProps = {
    initMain: actions.main.initMain,
};

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
