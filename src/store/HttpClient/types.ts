import {AxiosRequestConfig, AxiosResponse} from "axios";

type Actions = {
    get: <T>(url:string, config?:AxiosRequestConfig) => Promise<AxiosResponse<T,any>>;
    post: <T>(url:string, data?:any, config?:AxiosRequestConfig) => Promise<AxiosResponse<T,any>>;
    put: <T>(url:string,data?:any,config?: AxiosRequestConfig) => Promise<AxiosResponse<T, any>>;
    del: <T>(url:string,config? :AxiosRequestConfig) => Promise<AxiosResponse<T,any>>;
    patch: <T>(url:string,data?:any,config?: AxiosRequestConfig) => Promise<AxiosResponse<T, any>>;
}

export type { Actions };

