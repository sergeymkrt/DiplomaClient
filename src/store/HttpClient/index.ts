import { Actions } from './types';
import { atom, useRecoilState } from 'recoil';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios/index';
import { useCallback, useMemo } from 'react';
import { AxiosResponse } from 'axios';

const axiosState = atom<AxiosInstance>({
  key: 'axiosState',
  default: axios.create({
    baseURL: import.meta.env.API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
});

function useHttpClient(): Actions {
  const [httpClient, setHttpClient] = useRecoilState(axiosState);

  const client = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T, any>> => {
    const response = await httpClient.request<T>(config);
    return response;
  };

  const get = useCallback(
    <T>(url: string, config?: AxiosRequestConfig) => client<T>({ ...config, url, method: 'GET' }),
    [setHttpClient],
  );
  const post = useCallback(
    <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      client<T>({ ...config, url, data, method: 'POST' }),
    [setHttpClient],
  );
  const put = useCallback(
    <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      client<T>({ ...config, url, data, method: 'PUT' }),
    [setHttpClient],
  );

  const del = useCallback(
    <T>(url: string, config?: AxiosRequestConfig) =>
      client<T>({ ...config, url, method: 'DELETE' }),
    [setHttpClient],
  );

  const patch = useCallback(
    <T>(url: string, config?: AxiosRequestConfig) => client<T>({ ...config, url, method: 'PATCH' }),
    [setHttpClient],
  );

  const actions = useMemo(() => ({ get, put, post, del, patch }), [get, put, post, del, patch]);

  return actions as Actions;
}
