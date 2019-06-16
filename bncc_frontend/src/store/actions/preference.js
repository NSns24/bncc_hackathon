import * as actionTypes from "../actions/actionTypes";

export const updateCurrPref = () => {
    return {
        type: actionTypes.UPDATE_CURR_PREF
    };
};

export const updatePrefLocation = (city, address, lat, long) => {
    return {
        type: actionTypes.UPDATE_PREF_LOCATION,
        city: city,
        address: address,
        lat: lat,
        long: long
    };
};

export const setVenueID = venueId => {
    return {
        type: actionTypes.SET_VENUEID,
        venueId: venueId
    };
};
