import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LandingPage from "./containers/LandingPage/LandingPage";
import Home from "./containers/Home/Home";
import HomeAdmin from "./containers/HomeAdmin/HomeAdmin";
import MyVenue from "./containers/MyVenue/MyVenue";
import Preference from "./containers/Preference/Preference";
import LandingPageAdmin from "./containers/LandingPageAdmin/LandingPageAdmin";
import Welcome from "./containers/Welcome/Welcome";
import Logout from "./components/Logout/Logout";
import Venue from "./containers/Venue/Venue";
import * as actions from "./store/actions/index";

function App({ user, onGetUser }) {
    useEffect(() => {
        onGetUser();
    }, [onGetUser]);

    const RoleConstant = {
        ADMIN: "ADMIN",
        MEMBER: "MEMBER"
    };

    let routes = (
        <Switch>
            <Route path="/user" exact component={LandingPage} />
            <Route path="/admin" exact component={LandingPageAdmin} />
            <Route path="/" exact component={Welcome} />
            <Redirect to="/" />
        </Switch>
    );

    if (user) {
        if (user.role === RoleConstant.MEMBER) {
            routes = (
                <Switch>                    
                    <Route path="/preference" exact component={Preference} />
                    <Route path="/venue/:id" exact component={Venue} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/logout" exact component={Logout} />
                    <Redirect to="/home" />
                </Switch>
            );
        } else if (user.role === RoleConstant.ADMIN) {
            routes = (
                <Switch>
                    <Route path="/myVenue" exact component={MyVenue} />
                    <Route path="/homeAdmin" exact component={HomeAdmin} />
                    <Route path="/logout" exact component={Logout} />
                    <Redirect to="/homeAdmin" />
                </Switch>
            );
        }
    }

    return <div>{routes}</div>;
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUser: () => dispatch(actions.getUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
