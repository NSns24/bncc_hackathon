import { Modal } from "antd";

export const isEmpty = val => {
    if (val !== null && val !== undefined && val.trim() !== "") {
        return false;
    }

    return true;
};

export const modal = (type, title, content, onOk, opts) => {
    if (type === "success") {
        Modal.success({
            title: title,
            content: content,
            onOk: onOk || {},
            ...opts
        });
    } else if (type === "error") {
        Modal.error({
            title: title,
            content: content,
            onOk: onOk || {},
            ...opts
        });
    }
};
