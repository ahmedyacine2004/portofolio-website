import axios from 'axios';

import { env } from './env';

export const api = axios.create({
  baseURL: env.apiUrl,

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Later:
    // const token = localStorage.getItem('access_token');
    //
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized requests here later.
    }

    return Promise.reject(error);
  },
);
