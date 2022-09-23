import { authReducer, AuthState, AuthAction } from '../../../src/auth/context/AuthReducer';

describe('Test authReducer', () => {

    test('should return default state', () => {
        const state = authReducer({ logged: false, user: null }, {
            type: ''
        });
        expect( state ).toEqual( state );
    });

    test('should login', () => {
        const action: AuthAction = {
            type: 'logIn',
            payload: {
                user: { id: '123', name: 'Juan' }
            }
        }
        const state: AuthState = authReducer({ logged: false, user: null }, action);

        expect( state ).toEqual({
            logged: true,
            user: { id: '123', name: 'Juan' }
        })

    })

    test('should logout', () => {
        const state: AuthState = {
            logged: false,
            user: { id: '123', name: 'Juan'}
        };
        const newState: AuthState = authReducer(state, {
            type: 'logOut'
        });

        expect( newState ).toEqual({
            logged: false,
            "user": null,
        });

    })

})