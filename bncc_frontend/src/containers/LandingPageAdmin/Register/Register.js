import React, { useEffect } from "react";
import { Form, Input, Button, PageHeader } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { modal } from "../../../helpers/utility";
import * as actions from "../../../store/actions/index";

function Register({ form, history, auth, onRegister }) {
    const { getFieldDecorator, getFieldValue } = form;

    useEffect(() => {
        if (auth.user) {
            modal("success", "Register Success", "Please Click Ok", () => {
                history.replace("/home");
            });
        }
    }, [auth.user, history]);

    const sumbitHandler = e => {
        e.preventDefault();
        onRegister(
            getFieldValue("email"),
            getFieldValue("password"),
            getFieldValue("name"),
            getFieldValue("phone"),
            "ADMIN"
        );
    };

    const validateConfirmPass = (rule, value, callback) => {
        if (value && value !== form.getFieldValue("password")) {
            callback("Confirm Password not match!");
        } else {
            callback();
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 8
            }
        }
    };

    return (
        <>
            <PageHeader
                onBack={() => history.replace("/admin")}
                title="Register Admin"
                style={{ padding: "20px 0" }}
            />
            <Form {...formItemLayout} onSubmit={sumbitHandler}>
                <Form.Item label="E-mail">
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm" hasFeedback>
                    {getFieldDecorator("confirm", {
                        rules: [
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            {
                                validator: validateConfirmPass
                            }
                        ]
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Name">
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your name!",
                                whitespace: true
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Phone">
                    {getFieldDecorator("phone", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your phone number!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (email, password, name, phone, role) =>
            dispatch(actions.register(email, password, name, phone, role))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create()(Register)));
