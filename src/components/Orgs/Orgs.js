import React, { Component } from "react";
import { actions, services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";
import "./Orgs.css";

const mapStateToProps = (state) => {
    return {
        currentOrg: state.org.org,
        orgs: state.org.orgs,
    };
}

const mapActionsToProps = {
    selectOrg: actions.org.selectOrg
};

class Orgs extends Component {
    selectOrg(name) {
        this.props.selectOrg(name);
    }

    render() {
        const { orgs, currentOrg } = this.props;
        const isOrgsEmpty = services.utilityService.isEmpty(orgs);
        const orgsDisplay = isOrgsEmpty ?
            <h2>Loading orgs...</h2>
            : (Object.entries(orgs).map(([name, org]) => {
                const isSelected = org.name === currentOrg.name;
                return <Org org={org} key={org.name} className={isSelected ? "selected-org" : ""} onClickHandler={this.selectOrg.bind(this)} />;
            }));
        return (
            <div id="orgs">
                <h2 id="orgs-label">Orgs</h2>
                {orgsDisplay}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Orgs);