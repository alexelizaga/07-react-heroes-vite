import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { SearchPage } from '../../../src/heroes';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Test <SearchPage/>', () => { 

    beforeEach(() => jest.clearAllMocks());

    test('should render with default values', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot();
    })

    test('should show Batman and imput with queryString value', () => {
        render(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <SearchPage />
            </MemoryRouter>
        )
        
        const input: HTMLInputElement = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img: HTMLImageElement = screen.getByRole('img');
        expect( img.src ).toContain('batman');

        const alert: HTMLDivElement = screen.getByLabelText('alert-danger');
        expect( alert.style.display ).toBe('none');
    })

    test('should show error if hero is not found', () => {
        render(
            <MemoryRouter initialEntries={["/search?q=falsehero"]}>
                <SearchPage />
            </MemoryRouter>
        )

        const alert: HTMLDivElement = screen.getByLabelText('alert-danger');
        expect( alert.style.display ).not.toBe('none');
     })

    test('should call navigate', () => {
        const inputValue = 'superman';
        render(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchPage />
            </MemoryRouter>
        )

        const input: HTMLInputElement = screen.getByRole('textbox');
        fireEvent.change( input, { target: {name: 'searchText', value: inputValue} });

        const form: HTMLFormElement = screen.getByLabelText('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toBeCalledWith(`?q=${inputValue}`);
     })

 })