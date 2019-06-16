import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import BoxContainer from "../../components/Elements/BoxContainer/BoxContainer";
import LayoutPage from "../../hoc/LayoutPage/LayoutPage";

import axios from "../../axios";
import { modal } from "../../helpers/utility";

const PAGE_NAME = "Home";

function HomeAdmin({ user, history }) {
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        const data = {
            userId: user.id
        };

        axios.post("/venue/get/venue/byuserid", data).then(res => {
            if (res.data.success) {
                setVenue(res.data.venues);
            }
        });
    }, [user.id]);

    const promoteNow = () => {
        const data = {
            promote: {
                userId: user.id
            }
        };

        axios.post("/promote/upsert", data).then(res => {
            if (res.data.success) {
                modal("success", "Promote Success", "Yeah !!", () => {
                    history.replace("/");
                });
            }
        });
    };

    return (
        <>
            {venue ? (
                <>
                    <h1>
                        {venue[0].name.toUpperCase()} - {venue[0].description}
                    </h1>
                    <br />
                </>
            ) : null}
            <BoxContainer icon="pushpin" mode="light">
                <h1>Promote My Venue</h1>
                <h4 style={{ color: "red" }}>*additional charge may apply</h4>
                <Button type="primary" onClick={promoteNow}>
                    Promote
                </Button>
            </BoxContainer>
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutPage(HomeAdmin, PAGE_NAME));
