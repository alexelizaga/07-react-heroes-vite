import { User } from '../interfaces/authInterface';
import { types } from '../types/types';

export interface AuthState {
    logged: boolean;
    user: User | null;
}

export type AuthAction =
  | {type: 'logIn'; payload: {user: User}}
  | {type: 'logOut'}
  | {type: ''};

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    switch (action?.type) {
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