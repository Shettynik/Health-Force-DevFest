import axios from 'axios';

axios.defaults.withCredentials = true;

// const baseURL = 'http://localhost:5000';
const baseURL = 'https://ec2-3-238-174-201.compute-1.amazonaws.com/';

export const axiosInstance = axios.create({
    baseURL: baseURL
});
