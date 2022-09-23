import { useReducer } from 'react';

import { AuthContext } from './AuthContext'
import { authReducer, AuthState } from './AuthReducer';
import { LoginData, User } from '../interfaces/authInterface';


const authInitialState: AuthState = {
    logged: false,
    user: null,
  };

const init = () => {
    const user: User = JSON.parse( localStorage.getItem('user') );

    return {
        logged: !!user,
        user,
    }
}

export const AuthProvider = ({ children }: {children: JSX.Element | JSX.Element[]}) => {

    const [state, dispatch] = useReducer( authReducer, authInitialState, init );

    const logIn = ( { name }: LoginData ) => {
        const user = { id: 'ABC', name }

        localStorage.setItem( 'user', JSON.stringify(user) )

        dispatch({
            type: 'logIn',
            payload: {user: user}
        })
    }

    const logOut = () => {
        localStorage.removeItem('user');
        dispatch({type: 'logOut'});
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            logIn,
            logOut
        }}>
            { children }
        </AuthContext.Provider>
    )
}
