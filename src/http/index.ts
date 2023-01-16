import axios from "axios";
import {usegetToken} from "../state/hooks/authentication";

export const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        Authorization: `token ${usegetToken()}`
    }
})