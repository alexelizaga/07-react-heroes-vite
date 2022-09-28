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

 })