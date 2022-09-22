import { useReducer } from 'react';
import { AuthContext } from './AuthContext'
import { authReducer } from './AuthReducer';

interface AuthProviderProps {
    children: JSX.Element | JSX.Element[];
}

const initialState = {
    logged: false,
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [state, dispatch] = useReducer( authReducer, initialState );

    return (
        <AuthContext.Provider value={{}}>
            { children }
        </AuthContext.Provider>
    )
}
