import React, { Component } from "react";
import "./Org.css";

class Org extends Component {
    render() {
        const { name, className, onClickHandler} = this.props;
        const firstLetter = name[0].toUpperCase();
        const classes =  className ? `org ${className}` : "org";
        return (
            <div className={classes}>
                <button onClick={() => onClickHandler(name)}>{firstLetter}</button>
            </div>
        );
    }
}

export default Org;