import React from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";

import * as actions from "../../../../store/actions/index";

function TimeTable({ data, onSubmit }) {
    const returnDayName = id => {
        if (id === 1) {
            return "Monday";
        } else if (id === 2) {
            return "Tuesday";
        } else if (id === 3) {
            return "Wednesday";
        } else if (id === 4) {
            return "Thursday";
        } else if (id === 5) {
            return "Friday";
        } else if (id === 6) {
            return "Saturday";
        } else if (id === 7) {
            return "Sunday";
        }
    };

    const columns = [
        {
          title: 'Day',
          dataIndex: 'dayID',
          key: 'dayID',
        },
        {
          title: 'Start Time',
          dataIndex: 'start',
          key: 'start',
        },
        {
          title: 'End Time',
          dataIndex: 'end',
          key: 'end',
        },
      ];

    if (data != null && data.length > 0) {
        data.map((item, index) => {
            return data[index].dayID = returnDayName(item.dayId)
        })
    }

    return(
        <>
            <Table dataSource={data} columns={columns} />
            <Button type="primary" onClick={onSubmit}>
                Next
            </Button>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: () => dispatch(actions.updateCurrPref())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(TimeTable);
