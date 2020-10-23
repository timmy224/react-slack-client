import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services, store } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        
       
    }
}

const mapActionsToProps = {

}

class ChannelSideBar extends Component{
    render(){
        return(
            <div>
                <h1>I exist</h1>
            </div>
        )

    }
}
export default connect(mapStateToProps, mapActionsToProps)(ChannelSideBar);