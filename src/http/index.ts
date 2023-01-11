import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:8000/',
    // headers: {
    //     Accept: 'application/json',
    //     Content: 'application/json',
        // Authorization: `Token ${sessionStorage.getItem('token')}`
    // }
})