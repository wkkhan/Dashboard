import axios from 'axios';
import { API_BASE_URL } from '../../lib/config';
import { getAccessToken } from './authTokenStore';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15_000,
});

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Plug into a refresh flow and centralized error handling.
    return Promise.reject(error);
  }
);

export default httpClient;
