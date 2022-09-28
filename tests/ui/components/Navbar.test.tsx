import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext, AuthContextProps } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Test <Navbar/>', () => { 

    const contextValue: AuthContextProps = {
        logged: true,
        user: {
            id: 'ABC123',
            name: 'Alex'
        },
        logIn: () => {},
        logOut: jest.fn() ,
    }

    beforeEach(() => jest.clearAllMocks() );

    test('should show logged user', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug();
        expect(screen.getByText('Alex')).toBeTruthy();

    });

    test('should call logout and navigate when botton logout is clicked', () => {
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect( contextValue.logOut ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});

    });

 })