import React from "react";
import "./Org.css";

function Org(props) {
    const { name, className, onClickHandler } = props;
    const firstLetter = name[0].toUpperCase();
    const classes = className ? `org ${className}` : "org";
    return (
        <div className={classes}>
            <button onClick={() => onClickHandler(name)}>{firstLetter}</button>
        </div>
    );
}

export default Org;