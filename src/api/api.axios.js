import axios from "axios";
const defaultURl="http://192.168.1.74:8080/";

export const axiosPrivate = axios.create({
    baseURL:defaultURl,
});