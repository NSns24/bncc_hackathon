import axios from "axios";

const instance = axios.create({
    baseURL: "http://10.232.79.182:8080/"
});

export default instance;
