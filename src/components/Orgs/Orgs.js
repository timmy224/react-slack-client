import React, { Component } from "react";
import { actions, services } from "../../context";
import { connect } from "react-redux";
import Org from "../Org/Org";

const mapStateToProps = (state) => {
    return {
        orgs: state.org.orgs
    };    
}

const mapActionsToProps = {

}

class Orgs extends Component {

    selectOrg = (event) => {

    }

    render() {
        const { orgs } = this.props;
        const isOrgsEmpty = services.utilityService.isEmpty(orgs);
        const orgsDisplay = isOrgsEmpty ?
            <h2>Loading orgs...</h2>
            : (Object.entries(orgs).map(([org_id, org]) => 
                <Org org={org} />
            ));
        return (
            <div class="orgs">
                {orgsDisplay}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Orgs);