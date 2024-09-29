import { HASURA_API_URL } from '@/config';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: HASURA_API_URL,
  headers: {
    ['Content-Type']: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
