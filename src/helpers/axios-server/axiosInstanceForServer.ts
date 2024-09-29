import { HASURA_ADMIN_SECRET, HASURA_API_URL } from '@/config';
import axios from 'axios';

export const axiosInstanceForServer = axios.create({
  baseURL: HASURA_API_URL,
  headers: {
    ['Content-Type']: 'application/json',
    ['x-hasura-admin-secret']: HASURA_ADMIN_SECRET!,
  },
});

axiosInstanceForServer.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

axiosInstanceForServer.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
