import axios, { AxiosResponse } from "axios";
import Apis from '../api/Apis';

const instance = axios.create({
    baseURL: 'http://192.168.188.7:7001',
    timeout: 10000
});

instance.interceptors.response.use(
    response => response,
    error => {
        const { response } = error;
        if (!response) {
            const { httpCode } = response;
            if (httpCode >= 500) {

            } else if (httpCode === 400) {

            } else if (httpCode === 401) {

            } else if (httpCode === 403) {

            } else if (httpCode === 404) {

            } else {

            }
        } else {
            //网络异常
        }
        return Promise.reject(error);
    }
)

export const request = (name: string, params: any): Promise<AxiosResponse<any, any>> => {
    const api = (Apis as any)[name];

    const { url, method } = api;
    if (method === 'get') {
        return get(url, params);
    } else {
        return post(url, params);
    }
}

export const get = (url: string, params: any) => {
    return instance.get(url, {
        params: params
    })
}

export const post = (url: string, params: any) => {
    return instance.post(url, params);
}