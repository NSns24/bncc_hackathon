import React from "react";
import SliderDiv from "react-slick";

import { Row, Col } from "antd";
import CardItem from "../CardItem/CardItem";

function Slider({ data }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <SliderDiv {...settings} style={{ display: "flex" }}>
            {data.map((item, index) => {
                if (item === undefined && data.every(el => el === undefined)) {
                    return (
                        <Row gutter={16} key={index}>
                            <Col span={24}>
                                <CardItem item="Temp" loading={true} />
                            </Col>
                        </Row>
                    );
                }

                return (
                    <Row gutter={16} key={item.id}>
                        <Col span={24}>
                            <CardItem item={item} loading={false} />
                        </Col>
                    </Row>
                );
            })}
        </SliderDiv>
    );
}

export default Slider;
