import React from "react";
import styles from "./DateSeparator.module.css";

function DateSeparator({dateStr}) {  
    const { dateSeparator } = styles;
    return (
        
            <p className={dateSeparator}><span>{dateStr}</span></p>
        
    );        
}

export default DateSeparator;