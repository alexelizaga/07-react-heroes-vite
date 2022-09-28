import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthContext, AuthContextProps } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';


describe('Test <PrivateRoute />', () => {

    test('should show children if is authenticated', () => {

        Storage.prototype.setItem = jest.fn();

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
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={["/marvel"]}>
                    <PrivateRoute>
                        <h1>Private route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText('Private route')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/marvel");

    });

    test('should navigate if is not authenticated', () => {

        const contextValue: AuthContextProps = {
            logged: false,
            user: null,
            logIn: () => {},
            logOut: () => {},
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route path='marvel' element={
                            <PrivateRoute>
                                <h1>Private route</h1>
                            </PrivateRoute>
                        } />
                        <Route path='login' element={<h1>Login page</h1>} />
                    </Routes>
                    
                </MemoryRouter>
                
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText('Login page')).toBeTruthy();
    });

})