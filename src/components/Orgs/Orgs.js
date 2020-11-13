import React, { Component } from "react";
import { services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";
import "./Orgs.css";

const mapStateToProps = (state) => {
    return {
        orgs: state.org.orgs
    };    
}

class Orgs extends Component {
    render() {
        const { orgs } = this.props;
        const isOrgsEmpty = services.utilityService.isEmpty(orgs);
        const orgsDisplay = isOrgsEmpty ?
            <h2>Loading orgs...</h2>
            : (Object.entries(orgs).map(([orgId, org]) => 
                <Org org={org} key={org.name}  />
            ));
        return (
            <div id="orgs">
                <h2 id="orgs-label">Orgs</h2>
                {orgsDisplay}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Orgs);