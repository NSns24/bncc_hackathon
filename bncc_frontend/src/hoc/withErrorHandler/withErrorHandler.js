import React, { useState, useEffect } from "react";
import { modal } from "../../helpers/utility";

function withErrorHandler(WrappedComponent, axios) {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptors = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptors = axios.interceptors.response.use(
            res => res,
            err => {
                setError(err.response.data.error);
                return Promise.reject(err);
            }
        );

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            };
        }, [resInterceptors, reqInterceptors]);

        useEffect(() => {
            if (error) {
                modal(
                    "error",
                    `Something went wrong (${error.status})`,
                    error.message,
                    () => {
                        setError(null);
                    }
                );
            }
        }, [error]);

        return (
            <>
                <WrappedComponent {...props} />
            </>
        );
    };
}

export default withErrorHandler;
