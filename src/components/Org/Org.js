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
        const orgName = org.name;
        this.props.selectOrg(orgName);
    }

    render() {
        const { org, className, onClickHandler} = this.props;
        const firstLetter = org.name[0].toUpperCase();
        const classes =  className ? `org ${className}` : "org";
        return (
            <div className={classes}>
                <button onClick={() => onClickHandler(org.name)}>{firstLetter}</button>
            </div>
        );
    }
}

export default connect(null, mapActionsToProps)(Org);