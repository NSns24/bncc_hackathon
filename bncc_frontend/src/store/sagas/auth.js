import { put } from "redux-saga/effects";
import axios from "../../axios";
import * as actions from "../actions/index";

export function* loginSaga(action) {
    try {
        const data = {
            email: action.email,
            password: action.password
        };

        const res = yield axios.post("/user/login", data);

        if (res.data.success) {
            yield localStorage.setItem("user", res.data.user.email);
            yield put(actions.loginSuccess(res.data.user));
        } else {
            yield put(actions.loginFail(res.data.message));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* registerSaga(action) {
    try {
        const data = {
            user: {
                email: action.email,
                password: action.password,
                name: action.name,
                phone: action.phone,
                role: action.role
            }
        };

        const res = yield axios.post("/user/upsert", data);

        if (res.data.success) {
            yield localStorage.setItem("user", res.data.user.email);
            yield put(actions.registerSuccess(res.data.user));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* getUserSaga(action) {
    try {
        const data = {
            email: localStorage.getItem("user")
        };

        const res = yield axios.post("/user/get/email", data);

        if (res.data.success) {
            yield put(actions.loginSuccess(res.data.user));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* logoutSaga(action) {
    yield localStorage.removeItem("user");
    yield put(actions.logoutSuccess());
}
