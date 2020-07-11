import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import CreateChannel from "../CreateChannel/CreateChannel"
import Challenge2 from "../challenge2/challenge2";
import { actions } from "../../context";

class MainComponent extends Component {
  componentDidMount() {
      this.props.initMain();
  }

  render() {
    return (
      <div>
        <Chat />
        <CreateChannel />
        <SideBar />
        <Challenge2 />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionsToProps = {
    initMain: actions.main.initMain,
};

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
