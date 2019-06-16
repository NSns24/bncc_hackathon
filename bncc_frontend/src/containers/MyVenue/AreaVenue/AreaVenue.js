import React, { useState } from "react";
import { Upload, Button, Input, Icon, List } from "antd";
import { connect } from "react-redux";
import styles from "./AreaVenue.module.css";
import * as actions from "../../../store/actions/index";

import axios from "../../../axios";

const { TextArea } = Input;

const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text"
    }
};

function AreaVenue({ onSubmit, venueId }) {
    const [unitName, setUnitName] = useState("");
    const [unitPic, setUnitPic] = useState(null);
    const [unitData, setUnitData] = useState([]);
    const [areaName, setAreaName] = useState("");
    const [areaDes, setAreaDes] = useState("");

    const resetUnitForm = () => {
        setUnitName("");
        setUnitPic(null);
    };

    const submitHandler = () => {
        const data = {
            area: {
                venueId: venueId,
                name: areaName,
                description: areaDes
            }
        };

        axios.post("/area/upsert", data).then(async res => {
            if (res.data.success) {
                let unit = {};
                await unitData.forEach(async item => {
                    unit = {
                        unit: {
                            areaId: res.data.area.id,
                            name: item.unitName,
                            pic: null
                        }
                    };

                    await axios.post("/unit/upsert", unit);
                });

                onSubmit();
            }
        });
    };

    const addUnitHandler = () => {
        const data = {
            unitName: unitName,
            unitPic: unitPic
        };

        const restData = [...unitData];
        restData.push(data);
        setUnitData(restData);
        resetUnitForm();
    };

    const setUnitPicValue = value => {
        setUnitPic(value.file.name);
    };

    const setUnitNameValue = value => {
        setUnitName(value.target.value);
    };

    return (
        <>
            <div className={styles.form_item}>
                <div className={styles.form_label}>Area Name</div>
                <Input
                    className={styles.form_input}
                    placeholder={"Ex: Football Court, Badminton Court, ..."}
                    value={areaName}
                    onChange={e => setAreaName(e.target.value)}
                />
            </div>
            <div className={styles.form_item}>
                <div className={styles.form_label}>Area Description</div>
                <TextArea
                    className={styles.form_input}
                    value={areaDes}
                    onChange={e => setAreaDes(e.target.value)}
                />
            </div>
            <div className={styles.form_item}>
                <div className={styles.box_form}>
                    <h3>Unit of Area</h3>
                    <p>
                        Unit of area describe your quantity of units in your
                        area, which explains the definition of each of those
                        unit.
                    </p>
                    <div className={styles.box_form_item}>
                        <div className={styles.form_label}>Unit Name</div>
                        <Input
                            className={styles.form_input}
                            placeholder={"Ex : Court C1, Court C2, ..."}
                            value={unitName}
                            onChange={setUnitNameValue}
                        />
                    </div>
                    <div className={styles.box_form_item}>
                        <div className={styles.form_label}>Unit Picture</div>
                        <Upload {...props} onChange={setUnitPicValue}>
                            <Button>
                                <Icon type="upload" /> Click to Upload
                            </Button>
                        </Upload>
                    </div>
                    <div className={styles.box_form_button}>
                        <Button onClick={addUnitHandler}>Add Unit</Button>
                    </div>

                    <List
                        bordered
                        dataSource={unitData}
                        renderItem={item => (
                            <List.Item>{item.unitName}</List.Item>
                        )}
                    />
                </div>
            </div>

            <div className={styles.form_item}>
                <Button type="primary" onClick={submitHandler}>
                    Add Area
                </Button>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        venueId: state.preferenceReducer.venueId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: () => dispatch(actions.updateCurrPref())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AreaVenue);
