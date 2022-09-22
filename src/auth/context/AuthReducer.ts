import { types } from '../types/types';

export const authReducer = ( state = {}, action: { type: string, payload: string } ) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                name: action.payload
            };
        case types.logout:
            return {
                logged: false
            };
        default:
            return state;
    }
}