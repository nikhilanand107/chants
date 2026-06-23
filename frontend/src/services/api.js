import axios from 'axios';

const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  // If the user set the URL in Vercel but forgot to add /api/v1 at the end, append it automatically
  if (import.meta.env.VITE_API_URL && !url.endsWith('/api/v1')) {
    url = `${url.replace(/\/$/, '')}/api/v1`;
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseUrl(),
});

// Request interceptor to attach JWT token to all requests if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
