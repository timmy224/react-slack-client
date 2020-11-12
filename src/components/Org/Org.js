import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";
import "./Org.css";

const mapActionsToProps = {

}

class Org extends Component {
    render() {
        const { org } = this.props;
        const firstLetter = org.name[0].toUpperCase();
        return (
            <button class="org">{firstLetter}</button>
        );
    }

}

export default connect(null, mapActionsToProps)(Org);