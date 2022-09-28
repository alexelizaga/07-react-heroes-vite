import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { SearchPage } from '../../../src/heroes';

describe('Test <SearchPage/>', () => { 

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

 })