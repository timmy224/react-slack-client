import React from "react";
import styles from "./Org.module.css";

function Org(props) {
    const { org } = styles
    const { name, className, onClickHandler } = props;
    const firstLetter = name[0].toUpperCase();
    return (
        <div className={`${className} ${org}`}>
            <button onClick={() => onClickHandler(name)}>{firstLetter}</button>
        </div>
    );
}

export default Org;