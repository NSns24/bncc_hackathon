import React from 'react';
import styles from './BoxContainer.module.css';
import {Icon} from 'antd';
function BoxContainer({icon, children, mode}) {
    /* Mode : Dark & Light */ 
    const modeClass = mode === "dark" ? "box_container_dark" : "box_container_light";
    let iconClass = ""
    if(icon) { 
        iconClass = <div className={styles.icon}><Icon type={icon} /></div>
    }
    return (
        <div className={styles[modeClass]}>
            {iconClass}
            <div className={styles.paddingContainer}>
                {children}
            </div>
        </div>
    );
}   
export default BoxContainer;