import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
});

export const registerUser = async (userData) => {
  const response = await apiClient.post('/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/me');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/user/${id}`);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/logout');
  return response.data;
};
