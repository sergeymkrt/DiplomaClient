import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from './env';
import useNotifications from '@/store/notifications';

export const http = axios.create({
  baseURL: ENV.VITE_BACKEND_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const httpClient = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T, unknown>> => {
  return await http.request<T>(config);
};

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T, unknown>> => httpClient<T>({ ...config, url, method: 'GET' });

export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T, unknown>> => httpClient<T>({ ...config, url, data, method: 'POST' });

export const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T, unknown>> => httpClient<T>({ ...config, url, data, method: 'PUT' });

export const patch = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T, unknown>> => httpClient<T>({ ...config, url, data, method: 'PATCH' });

export const del = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T, unknown>> => httpClient<T>({ ...config, url, method: 'DELETE' });
