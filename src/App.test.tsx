import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders the collected candies header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Collected candies/i);
  expect(linkElement).toBeInTheDocument();
});
