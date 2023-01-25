export const usePersistToken = () => {
    return (token: string) => {
        sessionStorage.setItem('token', token);
    }
}

export const useGetToken = () => {
    return sessionStorage.getItem('token');
}

export const useCleanToken = () => {
    sessionStorage.removeItem('token');
}

export const useIsAuthenticated = () => {
    const token = useGetToken()
    return !!token;
}


