import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pokémon Explorer heading', async() => {
  render(<App />);
  const headerElement = await screen.getByText(/Pokémon Explorer/i);
  expect(headerElement).toBeInTheDocument();
});
