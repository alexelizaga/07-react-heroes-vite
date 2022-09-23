import { User } from '../interfaces/authInterface';
import { types } from '../types/types';

export interface AuthState {
    logged: boolean;
    user: User | null;
}

type AuthAction =
  | {type: 'logIn'; payload: {user: User}}
  | {type: 'logOut'};

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    switch (action.type) {
        case 'logIn':
            return {
                ...state,
                logged: true,
                user: action.payload.user
            };
        case 'logOut':
            return {
                ...state,
                logged: false,
                user: null
            };
        default:
            return state;
    }
}