import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../Card';

describe('<App/> Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('Should render <Card /> Component', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            //First Data Fetch
            data: 'data'
        }));

        render(
            <Card title='Test Title'><p>Test Content</p></Card>
        )
    })
})