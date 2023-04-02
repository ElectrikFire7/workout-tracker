import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/",
});

api.defaults.withCredentials = true;

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 401)
            // eslint-disable-next-line no-restricted-globals
            location.href = `${location.origin}/login`;
    }
);

export default api;
