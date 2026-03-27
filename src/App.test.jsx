import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { vi, afterEach } from 'vitest'; // Vitest's special tool for mocking
import App from './App';

describe('App Component (Integration Test)', () => {

    // Resets the global fetch mock after every test to prevent data leaks.
    afterEach(() => {
        vi.restoreAllMocks();
    });

    

    // Test 1: Initial Render
    it('renders the search input and button on initial load', () => {
        // 1. ARRANGE: Render the App to the virtual screen.
        render(<App />);

        // 2. ACT: (None required for initial render).

        // 3. ASSERT: Verify that the expected elements are visible on the screen.
        expect(screen.getByPlaceholderText('Enter postcode')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });



    // Test 2: User Interaction
    it('updates the input value when a user types a postcode', async () => {
        // 1. ARRANGE: Initialize the virtual user, render the app, and locate the input.
        const user = userEvent.setup();
        render(<App />);
        
        const searchInput = screen.getByPlaceholderText('Enter postcode');

        // 2. ACT: Simulate a user typing a postcode into the input field.
        await user.type(searchInput, 'SW1A 1AA');
        
        // 3. ASSERT: Verify the input field's value updates to match the typed text.
        expect(searchInput).toHaveValue('SW1A 1AA');
    });



    // Test 3: Network Mocking
    it('fetches and displays restaurants when a valid postcode is searched', async () => {
        // 1. ARRANGE: Mock the global fetch API to return a successful, controlled response.
        const user = userEvent.setup();
        
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    restaurants: [
                        { name: "Martin's Pizza Palace", rating: { starRating: 4.8 }, address: { city: "London" } }
                    ]
                })
            })
        );

        render(<App />);
        const searchInput = screen.getByPlaceholderText('Enter postcode');
        const searchButton = screen.getByRole('button', { name: /search/i });

        // 2. ACT: Simulate user input and form submission.
        await user.type(searchInput, 'SW1A 1AA');
        await user.click(searchButton);

        // 3. ASSERT: Verify that the component processes the mocked API response and renders the data.
        await waitFor(() => expect(screen.getByText("Martin's Pizza Palace")).toBeInTheDocument());
    });
});
