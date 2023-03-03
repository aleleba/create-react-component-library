import React from 'react';
import { Card } from '@components';

describe('Testing Card Component', () => {
  beforeEach(() => {
    cy.mount(<Card title='Test Title'><p>Test Content</p></Card>);
  })
  it('Show Title', () => {
    cy.get('div').contains('Test Title');
  })
  it('Show Child Component', () => {
    cy.get('p').contains('Test Content');
  })
})
