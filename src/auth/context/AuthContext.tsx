import { createContext } from 'react';
import { LoginData, User } from '../interfaces/authInterface';

export type AuthContextProps = {
    logged: boolean;
    user: User | null;
    logIn: (loginData: LoginData) => void;
    logOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);