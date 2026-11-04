import axios from 'axios';
import { dispatchToast } from '../utils/toastDispatcher';

const API_URL = import.meta.env.VITE_API_URL || 'https://studysync-zgwh.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';

    // 401 Session Expiration (ignoring passive background auth check)
    if (status === 401 && !url.includes('/auth/user')) {
      dispatchToast({
        title: "Session Expired",
        message: "Your login session has expired. Please log in again to continue.",
        variant: "warning",
        category: "system",
        actionUrl: "/login",
      });
    } else if (status >= 500) {
      dispatchToast({
        title: "Server Operation Error",
        message: "An internal server error occurred. Please retry shortly.",
        variant: "error",
        category: "system",
      });
    } else if (error.code === 'ERR_NETWORK') {
      dispatchToast({
        title: "Network Connection Lost",
        message: "Unable to reach the server. Please verify your internet connection.",
        variant: "error",
        category: "system",
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
