import * as actionTypes from "../actions/actionTypes";

const initialState = {
    current: 0,
    location: null,
    venueId: null
};

const currentMax = 2;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CURR_PREF:
            return {
                ...state,
                current: (state.current === currentMax) ? 0 : state.current + 1
            };
        case actionTypes.UPDATE_PREF_LOCATION:
            return {
                ...state,
                location: {
                    city: action.city,
                    address: action.address,
                    lat: action.lat,
                    long: action.long
                }
            };
        case actionTypes.SET_VENUEID:
            return {
                ...state,
                location: null,
                venueId: action.venueId
            }
        default:
            return state;
    }
};

export default reducer;
