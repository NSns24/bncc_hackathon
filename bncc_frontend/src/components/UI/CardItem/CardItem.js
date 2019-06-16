import React from "react";
import { Card, Skeleton } from "antd";
import { withRouter } from "react-router-dom";

const { Meta } = Card;

function CardItem({ item, loading, history }) {
    return (
        <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
            <Card
                hoverable
                cover={
                    <img
                        alt={item.name}
                        src={item.photos}
                        style={{ height: 150, objectFit: "cover" }}
                    />
                }
                style={{ flex: "1" }}
                onClick={() => history.replace("venue/" + item.id)}
            >
                <Meta
                    title={item.name}
                    description={item.address}
                    style={{ textAlign: "left" }}
                />
            </Card>
        </Skeleton>
    );
}

export default withRouter(CardItem);
