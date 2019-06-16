import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

function Login({ form, error, onLogin }) {
    const { getFieldDecorator, getFieldValue } = form;

    const sumbitHandler = e => {
        e.preventDefault();
        onLogin(getFieldValue('email'), getFieldValue('password'));
    };

    return (
        <>
            <h1>Login Admin</h1>
            <Form onSubmit={sumbitHandler}>
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your email!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Email"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <a href="www.google.com" style={{ float: "right" }}>
                        Forgot Password
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Log In
                    </Button>
                    Or{" "}
                    <Link
                        to={{
                            pathname: "/admin",
                            state: {
                                register: true
                            }
                        }}
                    >
                        Register Now!
                    </Link>
                </Form.Item>
            </Form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        error: state.authReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
