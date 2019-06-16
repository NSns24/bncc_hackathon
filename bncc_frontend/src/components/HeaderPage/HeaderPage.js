import React from "react";
import { PageHeader } from "antd";

function Header({ name }) {
    const itemRender = (route) => (
        <span>{route.breadcrumbName}</span>
    );

    const routes = [
        {
            breadcrumbName: "Sports Center"
        },
        {
            breadcrumbName: name
        }
    ];

    return (
        <PageHeader
            title={name}
            breadcrumb={{ itemRender: itemRender, routes: routes }}
        />
    );
}

export default Header;
