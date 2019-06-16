import React, { useState } from "react";
import { Select, Button, List, Collapse, TimePicker, Input } from "antd";
import { connect } from "react-redux";
import styles from './SchedulePrices.module.css';
import * as actions from "../../../store/actions/index";
import moment from "moment";
import { withRouter } from "react-router-dom";

const Panel = Collapse.Panel;
const {Option} = Select;
const area = [
    {
        "areaID" : 1,
        "areaName" : "Football Court",
        "areaDesc" : "Court is usable for football sports, the court is made of rubber contain ...",
        "units" : [
            {
                "unitID" : 1,
                "unitName" : "Foot A Court",
            },{
                "unitID" : 2,
                "unitName" : "Foot B Court"
            }
        ]
    },{
        "areaID" : 2,
        "areaName" : "Tennis Court",
        "areaDesc" : "Court is usable for Tennis sports, the court is made of rubber contain ...",
        "units" : [
            {
                "unitID" : 3,
                "unitName" : "Tennis A Court",
            },{
                "unitID" : 4,
                "unitName" : "Tennis B Court"
            }
        ]
    }
]

function SchedulePrices({ user, history, onSubmit }) {
    
    const [day, setDay] = useState("");
    const [areaData] = useState(area);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("12:00");

    const keyJoin = []
    areaData.map(data => {
        return keyJoin.push(data.areaID.toString())
    })

    const changeDayHandler = value => {
        setDay(value);
    };

    const changeStartTimeHandler = (mom, value) => {
        setStartTime(value);
    };

    const changeEndTimeHandler = (mom, value) => {
        setEndTime(value);
    };

    const submitHandler = () => {
        onSubmit();
        history.replace('/homeAdmin');
    }

    return (
        <>            
            <Collapse defaultActiveKey={keyJoin}>
                {
                areaData.map(data => (
                    <Panel key={data.areaID} header={data.areaName}>
                        <p>{data.areaDesc}</p>
                        <List
                            bordered
                            dataSource={data.units}
                            renderItem={item => (
                                <List.Item>
                                    {item.unitName}
                                    <div className={styles.form_row}>
                                        <Select
                                            defaultValue={day}
                                            onChange={changeDayHandler}
                                        >
                                            <Option value="">Select Day</Option>
                                            <Option value="1">Monday</Option>
                                            <Option value="2">Tuesday</Option>
                                            <Option value="3">Wednesday</Option>
                                            <Option value="4">Thursday</Option>
                                            <Option value="5">Friday</Option>
                                            <Option value="6">Saturday</Option>
                                            <Option value="7">Sunday</Option>
                                        </Select>
                                        &nbsp;
                                        <TimePicker
                                            format="HH:mm"
                                            onChange={changeStartTimeHandler}
                                            value={moment(startTime, "HH:mm")}
                                        /> &nbsp; - &nbsp;
                                        <TimePicker
                                            format="HH:mm"
                                            onChange={changeEndTimeHandler}
                                            value={moment(endTime, "HH:mm")}
                                        />
                                        &nbsp;
                                        <Input className={styles.form_input} placeholder={"Price"} />
                                        &nbsp;
                                        <Button ghost type="primary">Add Shift</Button>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Panel>
                ))}
            </Collapse>

            <div className={styles.form_item}>
                <Button type="primary" onClick={submitHandler}>Add Information</Button>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: () => dispatch(actions.updateCurrPref())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SchedulePrices));
