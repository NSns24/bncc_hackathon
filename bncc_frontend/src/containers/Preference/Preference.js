import React from "react";
import { connect } from "react-redux";

import LayoutPage from "../../hoc/LayoutPage/LayoutPage";
import StepsCon from "../StepsCon/StepsCon";
import Sport from "./Sport/Sport";
import Time from "./Time/Time";
import Location from "./Location/Location";

const PAGE_NAME = "Preference";

const steps = [
    {
        title: "Sport"
    },
    {
        title: "Time"
    },
    {
        title: "Location"
    }
];

function Preference({ current }) {
    return (
        <StepsCon current={current} steps={steps}>
            {current === 0 ? <Sport /> : current === 1 ? <Time /> : <Location />}
        </StepsCon>
    );
}

const mapStateToProps = state => {
    return {
        current: state.preferenceReducer.current
    };
};

export default connect(
    mapStateToProps
)(LayoutPage(Preference, PAGE_NAME));
