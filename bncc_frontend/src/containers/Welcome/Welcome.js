import React from 'react';
import Particles from "../../components/UI/Particles/Particles";
import styles from "../Welcome/Welcome.module.css";
import { Button } from 'antd';
import logo from "../../assets/images/logo.png";
import BoxContainer from '../../components/Elements/BoxContainer/BoxContainer';
import {withRouter} from 'react-router'
function Welcome({history}) { 

    const redirectToLandingPage = () => { 
        history.replace("/user")
    }

    const redirectToLandingPageAdmin = () => { 
        history.replace("/admin")
    }

    return (
        <>
            <Particles type="bubble" />
            <div className={styles.center_container}>
                <img
                    src={logo}
                    className={styles.logoSideDrawer}
                    alt="Logo"
                />
                <div className={styles.title}>Sports Center</div>
                <div className={styles.description}>Find venues to do sports and get yourself healthy.</div>
                <Button ghost size={"large"} onClick={redirectToLandingPage}>GET STARTED</Button>   
                <p></p>
                <BoxContainer icon="reconciliation" mode="dark">
                    <div className={styles.casual_title}>Are You Owner of Sports Venue?</div>
                    <div className={styles.casual_description}>Help people do more sports and bring as many people to your venue. Give the best services for venue rental and earn popularity</div>
                    <Button ghost onClick={redirectToLandingPageAdmin}>Let's Go</Button>
                </BoxContainer>
            </div>
            
        </>
    );
}

export default withRouter(Welcome);