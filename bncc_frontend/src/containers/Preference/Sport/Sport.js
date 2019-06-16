import React, { useState, useEffect } from "react";
import { Select, Spin, Button } from "antd";
import { connect } from "react-redux";
import styles from './Sport.module.css';
import axios from "../../../axios";
import * as actions from "../../../store/actions/index";

const { Option } = Select;

function Sport({ user, onSubmit }) {
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [value, setValue] = useState([]);

    const fetchSports = value => {
        setFetching(true);
        const data = {
            name: value
        }

        axios.post('/sport/search', data).then(res => {
            setData(res.data.sports);
            setFetching(false);
        });
    };

    useEffect(() => {
        fetchSports('');
    }, []);

    const submitHandler = async () => {
        await value.forEach(async (item) => {
            const data = {
                userSportMapping: {
                    userId: user.id,
                    sportId: +item.key
                }
            }

            await axios.post('/user/sport/mapping/upsert', data);
        });

        onSubmit();
    }

    const changeHandler = value => {
        setValue(value);
        setData([]);
        setFetching(false);
    };

    return (
        <>
        <div className={styles.form_item}>
            <div className={styles.form_label}>What Sports do you like ?</div>
            <Select
                mode="multiple"
                labelInValue
                value={value}
                placeholder="Select Sports"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={fetchSports}
                onChange={changeHandler}
                style={{ width: "100%" }}
            >
                {data.map(d => (
                    <Option key={d.id}>{d.name}</Option>
                ))}
            </Select>
            <div className={styles.container_margin}>
                <Button type="primary" onClick={submitHandler}>Submit</Button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sport);
