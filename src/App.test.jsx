import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    it('renders the search input and button on initial load', () => {
        render(<App />);
        expect(screen.getByPlaceholderText('Enter postcode')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });
})