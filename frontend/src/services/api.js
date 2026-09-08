import axios from 'axios';

const API_URL = import.meta.env.API_URL || 'https://studysync-zgwh.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default apiClient;
