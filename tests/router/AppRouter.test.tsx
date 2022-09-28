import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, AuthContextProps } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Test <AppRouter/>', () => { 

    test('should show login component if is not authenticated', () => {

        const contextValue: AuthContextProps = {
            logged: false,
            user: null,
            logIn: () => {},
            logOut: () => {},
        }

        render(
            <MemoryRouter initialEntries={["/marvel"]}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect( screen.getAllByText('Login').length ).toBe(2);
    
    });

    test('should show marvel component if is authenticated', () => {

        const contextValue: AuthContextProps = {
            logged: true,
            user: {
                id: 'ABC123',
                name: 'Alex'
            },
            logIn: () => {},
            logOut: () => {},
        }

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);
        expect( screen.getByText('Alex')).toBeTruthy();
    
    });

 })