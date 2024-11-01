import axios from 'axios';

const backend_port = process.env.BACKEND_PORT || 5000;

const api = axios.create({
    baseURL: 'http://localhost:' + backend_port, // Update with the backend URL if necessary
});

export default api;
