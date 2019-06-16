import React from "react";
import Map from "../../Map/Map";
import { Button } from "antd";
import { connect } from "react-redux";
import styles from "./Location.module.css";
import { withRouter } from "react-router-dom";
import axios from "../../../axios";
import * as actions from "../../../store/actions/index";

function Location({ google, loca, user, history, onSubmit }) {
    const submitHandler = () => {
        const data = {
            preferredLocation: {
                userId: user.id,
                city: loca.city,
                address: loca.address,
                latitude: loca.lat,
                longtitude: loca.long
            }
        };

        axios.post("/user/preferred/location/upsert", data).then(res => {
            if (res.data.success) {
                onSubmit();
                history.replace("home");
            }
        });
    };

    return (
        <>
            <div className={styles.form_item}>
                <div className={styles.form_label}>Your Prefered Location</div>
                <Map
                    google={google}
                    center={{ lat: -6.2572006, lng: 106.7913482 }}
                    height="300px"
                    zoom={15}
                />
                 
            </div>
            <div className={styles.form_far_button}>
                <Button type="primary" onClick={submitHandler}>
                    Submit
                </Button>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        loca: state.preferenceReducer.location,
        user: state.authReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: () => dispatch(actions.updateCurrPref())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Location));
