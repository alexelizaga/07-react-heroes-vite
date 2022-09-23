import { useContext, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../auth/context/AuthContext';


export const PrivateRoute = ({ children }: any) => {

    const { logged } = useContext(AuthContext);
    const { pathname, search } = useLocation();

    const lastPath = pathname + search;
    useMemo(() => {
        localStorage.setItem('lastPath', lastPath);
    }, [lastPath])

    return (logged)
        ? children
        : <Navigate to={"/login"} />

}
