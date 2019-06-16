import React from "react";
import { connect } from "react-redux";

import LayoutPage from "../../hoc/LayoutPage/LayoutPage";
import StepsCon from "../StepsCon/StepsCon";
import VenueInformation from "./VenueInformation/VenueInformation";
import AreaVenue from "./AreaVenue/AreaVenue";
import SchedulePrices from "./SchedulePrices/SchedulePrices";

const PAGE_NAME = "MyVenue";

const steps = [
    {
        title: "Venue Information"
    },
    {
        title: "Area Venue"
    },
    {
        title: "Schedule and Prices"
    }
];

function MyVenue({ current }) {
    return (
        <StepsCon current={current} steps={steps}>
            {current === 0 ? (
                <VenueInformation />
            ) : current === 1 ? (
                <AreaVenue />
            ) : (
                <SchedulePrices />
            )}
        </StepsCon>
    );
}

const mapStateToProps = state => {
    return {
        current: state.preferenceReducer.current
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutPage(MyVenue, PAGE_NAME));
