import axios from 'axios';

export const baseURL = 'http://127.0.0.1:7001';

const service = axios.create({
  baseURL,
  timeout: 5000,
});

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default service;
