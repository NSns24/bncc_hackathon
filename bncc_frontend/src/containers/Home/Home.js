import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AutoComplete, Input, Icon, Select, List } from "antd";
import { withRouter } from "react-router-dom";
import LayoutPage from "../../hoc/LayoutPage/LayoutPage";
import Slider from "../../components/UI/Slider/Slider";
import styles from "./Home.module.css";
import axios from "../../axios";

const PAGE_NAME = "Home";
const { Option } = Select;
function Home({ user, history }) {
    const [venue, setVenue] = useState([]);
    const [searchState, setSearchState] = useState(false);
    const [searchVenue, setSearchVenue] = useState([]);
    const [promoteVenue, setPromoteVenue] = useState([]);
    const [sports, setSports] = useState([]);
    const [cities, setCities] = useState([]);
    const [sportId, setSportId] = useState("");
    const [city, setCity] = useState("");

    const selectHandler = value => {
        setSearchState(true);
        setCity(value);

        const data = {
            city: value,
            sportId: +sportId
        };

        axios.post("/venue/search", data).then(res => {
            setSearchVenue(res.data.venues);
        });
    };

    const searchHandler = () => {
        const data = {
            city: city,
            sportId: +sportId
        };

        axios.post("/venue/search", data).then(res => {
            setSearchVenue(res.data.venues);
        });
    };

    const listItemClickHandler = id => {
        history.replace("venue/" + id);
    };

    useEffect(() => {
        const data = {
            userId: user.id
        };

        axios.post("/venue/preferred/sport", data).then(res => {
            setVenue(res.data.venues);
        });

        axios.get("/promote/get").then(res => {
            setPromoteVenue(res.data.promotes);
        });

        axios.get("/sport/get/all").then(res => {
            setSports(res.data.sports);
        });

        axios.get("/venue/get/city").then(res => {
            setCities(res.data.cities);
        });
    }, [user.id]);

    let preferences = (
        <div>
            <hr />
            <h1>Based on your preference</h1>
            {venue.length > 0 ? (
                <Slider data={venue} />
            ) : (
                <Slider data={[...Array(6)]} />
            )}
            <hr />
            <h1>Discover</h1>
            {promoteVenue.length > 0 ? (
                <Slider data={promoteVenue} />
            ) : (
                <Slider data={[...Array(6)]} />
            )}
        </div>
    );

    if (searchState) {
        preferences = (
            <div>
                <List
                    className={styles.list}
                    bordered
                    dataSource={searchVenue}
                    renderItem={item => (
                        <List.Item
                            className={styles.list_item}
                            onClick={() => listItemClickHandler(item.id)}
                        >
                            <div className={styles.list_item_pic}>
                                <img src={item.photos} alt={item.name} />
                            </div>
                            <div className={styles.list_item_desc}>
                                <div className={styles.list_desc_title}>
                                    {item.name}
                                </div>
                                <div className={styles.list_desc_city}>
                                    {item.city}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    return (
        <>
            <div className={styles.title_container}>
                <div className={styles.title_text}>Find Your Venues</div>
            </div>
            <div className={styles.form_row}>
                <Select
                    style={{ width: "30%" }}
                    defaultValue={""}
                    onChange={value => setSportId(value)}
                >
                    <Option value="">Select Sports</Option>
                    {sports.map(item => {
                        return (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        );
                    })}
                </Select>
                <AutoComplete
                    dataSource={cities}
                    style={{ width: "100%" }}
                    placeholder="Search by location.."
                    filterOption={(inputValue, option) =>
                        option.props.children
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={selectHandler}
                >
                    <Input
                        className={styles.form_input}
                        suffix={
                            <Icon
                                type="search"
                                className="certain-category-icon"
                                onClick={searchHandler}
                            />
                        }
                    />
                </AutoComplete>
            </div>
            {preferences}
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutPage(withRouter(Home), PAGE_NAME));
