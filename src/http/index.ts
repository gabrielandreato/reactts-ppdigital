import axios, {AxiosRequestConfig} from "axios";
import {useGetToken} from "../state/hooks/authentication";

const token = useGetToken

export const http = axios.create({
    baseURL: 'http://191.101.15.157:8010/',
    // baseURL: 'http://127.0.0.1:8010/', // Dev url
})

http.interceptors.request.use((config:AxiosRequestConfig | any) => {
    // Do something before request is sent
    const token = useGetToken()
    if (token && config.headers) {
        config.headers.set(`Authorization`, `token ${sessionStorage.getItem('token')}`)
    }
    return config
}, function (error) {
    // Do something with request error
    console.log('Erro no interceptor do axios.')
    return Promise.reject(error);
});
