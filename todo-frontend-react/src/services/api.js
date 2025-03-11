import axios from "axios";

const API_URL = "https://demo2.z-bit.ee";

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/users`, userData);
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/get-token`, credentials);
    return response.data;
};

export const getTasks = async (token) => {
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const addTask = async (task, token) => {
    return axios.post(`${API_URL}/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateTask = async (id, updates, token) => {
    return axios.put(`${API_URL}/tasks/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteTask = async (id, token) => {
    return axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
