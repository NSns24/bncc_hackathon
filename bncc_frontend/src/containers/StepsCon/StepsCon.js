import React from "react";
import { Steps } from "antd";

import styles from "./StepsCon.module.css";

const { Step } = Steps;

function StepsCon({ children, current, steps }) {
    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className={styles.stepsContent}>{children}</div>
        </>
    );
}

export default StepsCon;
