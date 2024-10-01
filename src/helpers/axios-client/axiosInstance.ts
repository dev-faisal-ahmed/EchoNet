import axios from 'axios';

import { getSession } from 'next-auth/react';
import { HASURA_API_URL } from '@/config';

export const axiosInstance = axios.create({
  baseURL: HASURA_API_URL,
  headers: {
    ['Content-Type']: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
