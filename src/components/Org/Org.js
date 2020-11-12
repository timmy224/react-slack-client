import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";
import "./Org.css";

const mapActionsToProps = {
    selectOrg: actions.org.selectOrg
}

class Org extends Component {
    selectOrg = () => {
        const { org } = this.props;
        const orgId = org.org_id;
        console.log("Select org called!", orgId);
        this.props.selectOrg(orgId);
    }

    render() {
        const { org } = this.props;
        const firstLetter = org.name[0].toUpperCase();
        return (
            <button className="org" onClick={() => this.selectOrg()}>{firstLetter}</button>
        );
    }
}

export default connect(null, mapActionsToProps)(Org);