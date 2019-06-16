import React from "react";
import Particles from "react-particles-js";

import styles from "./Particles.module.css";

export default ({ type }) => {
    let params = {};
    let className;

    if (type === "bubble") {
        className = styles.particles;

        params = {
            particles: {
                number: {
                    value: 300,
                    density: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        speed: 4,
                        size_min: 0.3
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    random: true,
                    speed: 2,
                    direction: "top",
                    out_mode: "out"
                }
            }
        };
    } else if (type === "header") {
        className = styles.particlesHeader;

        params = {
            particles: {
                number: {
                    value: 50
                },
                size: {
                    value: 3
                }
            }
        };
    }

    return <Particles className={className} params={params} />;
};
