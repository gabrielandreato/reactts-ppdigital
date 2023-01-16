import {redirect, useNavigate} from "react-router-dom";

export const usePersistToken = () => {
    return (token: string) => {
        sessionStorage.setItem('token', token);
    }
}

export const usegetToken = () => {
    return sessionStorage.getItem('token');
}

export const useCleanToken = () => {
    sessionStorage.removeItem('token');
}

export const isAuthenticated = () => {
    const token = usegetToken()
    return !!token;
}


