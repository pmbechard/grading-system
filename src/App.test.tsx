import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: IMPLEMENT TESTS FOR JSON DATA

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
