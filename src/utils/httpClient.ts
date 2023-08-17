import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const http = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(error);
  },
);

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
