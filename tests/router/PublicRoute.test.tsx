import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthContext, AuthContextProps } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';


describe('Test <PublicRoute />', () => {

    test('should show children if is not authenticated', () => {

        const contextValue: AuthContextProps = {
            logged: false,
            user: null,
            logIn: () => {},
            logOut: () => {},
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Public route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText('Public route')).toBeTruthy();

    });

    test('should navigate if is authenticated', () => {

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
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Public route</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Marvel page</h1>} />
                    </Routes>
                    
                </MemoryRouter>
                
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText('Marvel page')).toBeTruthy();
    });

})