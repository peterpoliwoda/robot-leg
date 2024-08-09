import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from './Grid';

test('Renders Grid of size 5', () => {
  render(<Grid size={5} />);
  const gridCells = screen.getAllByTestId('cell');
  expect(gridCells).toHaveLength(25);
});

test('Renders Grid of size 10', () => {
  render(<Grid size={10} />);
  const gridCells = screen.getAllByTestId('cell');
  expect(gridCells).toHaveLength(100);
});

