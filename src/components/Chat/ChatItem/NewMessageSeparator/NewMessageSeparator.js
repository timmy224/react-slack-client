import React from "react";
import styles from "./NewMessageSeparator.module.css";

function NewMessageSeparator({dateStr}) {  
    const { newMessageSeparator } = styles;
    return (
            <p className={newMessageSeparator}><span>{dateStr}</span></p>
    );        
}

export default NewMessageSeparator;