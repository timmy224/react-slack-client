import React, { Component } from "react";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";

class MainComponent extends Component {
  render() {
    return (
      <div>
        <Chat />
        <SideBar />
      </div>
    );
  }
}

export default MainComponent;
