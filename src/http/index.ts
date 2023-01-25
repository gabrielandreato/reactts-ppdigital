import axios, {AxiosRequestConfig} from "axios";
import {useGetToken} from "../state/hooks/authentication";

const token = useGetToken

export const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    // headers: {
    //     Authorization: `token ${sessionStorage.getItem('token')}`
    // }
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
