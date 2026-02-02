import axios from 'axios';


const API_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
    baseURL: API_URL, 
    withCredentials: true // Required for session cookies
});

export const loginUser = async (username, password) => {
    try {
        const response = await API.post('/login', { username, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Server Error";
    }
};