import axios from 'axios';

axios.defaults.withCredentials = true;

const baseURL = 'http://localhost:5000';

export const axiosInstance = axios.create({
    baseURL: baseURL
});
