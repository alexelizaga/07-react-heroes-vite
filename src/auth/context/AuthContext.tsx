import { createContext } from 'react';
import { LoginData, User } from '../interfaces/authInterface';

type AuthContextProps = {
    user: User | null;
    logIn: (loginData: LoginData) => void;
    logOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);