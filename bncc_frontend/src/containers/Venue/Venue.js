import React, { useState, useEffect } from "react";
import { List, Collapse, Button } from "antd";
import { connect } from "react-redux";

import styles from "./Venue.module.css";
import LayoutPage from "../../hoc/LayoutPage/LayoutPage";

import axios from "../../axios";

const PAGE_NAME = "Venue";
const Panel = Collapse.Panel;

function Venue({ match }) {
    const [venueConst, setVenueConst] = useState({ areas: [], sports: [] });

    useEffect(() => {
        const data = {
            venueId: match.params.id
        };

        axios.post("/venue/get/detail", data).then(res => {
            if (res.data.success) {
                setVenueConst(res.data.venueDetail);
            }
        });
    }, [match.params.id]);

    const keyJoin = [];
    venueConst.areas.map(data => {
        return keyJoin.push(data.id.toString());
    });
    return (
        <>
            <div className={styles.venue_pic}>
                <img src={venueConst.pic} alt="venue-pic" />
            </div>
            <div className={styles.venue_title}>{venueConst.name}</div>
            <div className={styles.venue_city}>{venueConst.city}</div>
            <div className={styles.venue_sports}>
                {venueConst.sports.map(data => (
                    <div className={styles.venue_sports_item} key={data.id}>
                        {data.name}
                    </div>
                ))}
            </div>
            <div className={styles.box_container}>
                <div className={styles.box_title}>Overview</div>
                <div className={styles.box_item}>
                    <div className={styles.box_item_label}>Description</div>
                    <div className={styles.box_desc}>{venueConst.desc}</div>
                </div>
                <div className={styles.box_item}>
                    <div className={styles.box_item_label}>Facilities</div>
                    <div className={styles.box_desc}>
                        <List
                            dataSource={venueConst.facilities}
                            renderItem={item => (
                                <List.Item>{item.name}</List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.box_container}>
                <div className={styles.box_title}>Area</div>
                <Collapse defaultActiveKey={keyJoin}>
                    {venueConst.areas.map(data => (
                        <Panel key={data.id} header={data.name}>
                            <p>{data.description}</p>
                            <List
                                bordered
                                dataSource={data.units}
                                renderItem={item => (
                                    <List.Item>{item.name}</List.Item>
                                )}
                            />
                        </Panel>
                    ))}
                </Collapse>
            </div>
            <br />
            <Button type="primary">Booking / Become Member</Button>
        </>
    );
}

const mapStateToProps = state => {
    return {
        venueId: state.preferenceReducer.venueId
    };
};

export default connect(mapStateToProps)(LayoutPage(Venue, PAGE_NAME));
