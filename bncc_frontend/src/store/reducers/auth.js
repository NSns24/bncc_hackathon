import * as actionTypes from "../actions/actionTypes";

const initialState = {
    user: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                error: action.error,
                user: null
            };
        case actionTypes.AUTH_OK_ERROR:
            return {
                ...state,
                error: null
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                error: null
            }
        default:
            return state;
    }
};

export default reducer;
