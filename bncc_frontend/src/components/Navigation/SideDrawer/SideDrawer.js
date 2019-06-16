import React, { useState } from "react";
import { Affix, Layout } from "antd";

import NavItems from "../NavItems/NavItems";
import logo from "../../../assets/images/logo.png";
import styles from "./SideDrawer.module.css";

const { Sider } = Layout;

function SideDrawer() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(prevState => !prevState);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
            <Affix>
                <img
                    src={logo}
                    className={
                        collapsed
                            ? styles.logoSideDrawerCollapse
                            : styles.logoSideDrawer
                    }
                    alt="Logo"
                />
                <NavItems collapsed={collapsed} />
            </Affix>
        </Sider>
    );
}

export default SideDrawer;
