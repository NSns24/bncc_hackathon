import React, {useEffect} from "react";
import { Menu, Icon } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

function NavItems({ collapsed, location, user, onGetUser }) {

    useEffect(() => {
        onGetUser();
    }, [onGetUser]);

    let menus = {
        home: {
            to: "/home",
            type: "home",
            name: "Home"
        },
        preference: {
            to: "/preference",
            type: "home",
            name: "Preference"
        },
        logout: {
            to: "/logout",
            type: "unlock",
            name: "Logout"
        }
    };

    const RoleConstant = { 
        ADMIN : "ADMIN",
        MEMBER : "MEMBER"
    }
    
    if(user.role === RoleConstant.ADMIN) {
        menus = {
            home: {
                to: "/homeAdmin",
                type: "home",
                name: "Home"
            },
            myVenue: {
                to: "/myVenue",
                type: "home",
                name: "My Venue"
            },
            logout: {
                to: "/logout",
                type: "unlock",
                name: "Logout"
            }
        };
    }

    const activeMenuClassName = "ant-menu-item-selected";

    return (
        <Menu mode="inline" theme="dark">
            {Object.keys(menus).map((menu, index) => (
                <Menu.Item
                    key={index}
                    className={
                        location.pathname === menus[menu].to
                            ? activeMenuClassName
                            : null
                    }
                >
                    <NavLink exact to={menus[menu].to}>
                        <Icon type={menus[menu].type} theme="twoTone" />
                        <span>{menus[menu].name}</span>
                    </NavLink>
                </Menu.Item>
            ))}
        </Menu>
    );
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUser: () => dispatch(actions.getUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NavItems));
