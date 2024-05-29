import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VITE_API
});

export default api;