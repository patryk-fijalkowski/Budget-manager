import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

function request(config) {
    return axiosInstance.request(config);
}

const BudgedManagerAPI = {
    request,
};

export default BudgedManagerAPI;
