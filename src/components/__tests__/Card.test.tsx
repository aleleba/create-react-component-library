import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@components';

describe('<Card/> Component', () => {
    beforeEach(() => {
        // fetchMock.resetMocks();
        render(<Card title='Test Title'><p>Test Content</p></Card>)
    });
    it('Show Title', async () => {
        /* fetchMock.mockResponseOnce(JSON.stringify({
            //First Data Fetch
            data: 'data'
        })); */
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    })
    it('Show Child Component', async () => {
        /* fetchMock.mockResponseOnce(JSON.stringify({
            //First Data Fetch
            data: 'data'
        })); */
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    })
})
