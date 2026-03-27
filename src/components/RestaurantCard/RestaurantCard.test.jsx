import { render, screen } from '@testing-library/react';
import RestaurantCard from './RestaurantCard';


// --- MOCK DATA ---

// Complete data for the Happy Path
const mockRestaurant = {
  name: "Martin's Pizza Palace",
  cuisines: "Italian, Pizza",
  rating: "4.8",
  fullAddress: "123 React Way, London, SW1A 1AA",
  logoURL: "https://freedesignfile.com/upload/2019/03/vector-logo-slice-of-pizza-and-ribbon.jpg"
};

// Edge case data (NO logo)
const mockRestaurantNoLogo = {
  name: "Ghost Kitchen",
  cuisines: "Burgers",
  rating: "3.5",
  fullAddress: "Unknown Location",
  logoURL: "" 
};


// --- TESTS ---

describe('RestaurantCard Component (Component UI Test)', () => {
  
  // Test 1: The Happy Path
  it('renders the restaurant details correctly on the screen', () => {
    // 1. ARRANGE: Render the component using the complete mock data.
    render(<RestaurantCard restaurant={mockRestaurant} />);

    // 2. ACT: (None required for initial render).

    // 3. ASSERT: Verify that the text and image match the mock data perfectly.
    expect(screen.getByText("Martin's Pizza Palace")).toBeInTheDocument();
    expect(screen.getByText("Italian, Pizza")).toBeInTheDocument();
    expect(screen.getByText("123 React Way, London, SW1A 1AA")).toBeInTheDocument();

    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('src', 'https://freedesignfile.com/upload/2019/03/vector-logo-slice-of-pizza-and-ribbon.jpg');
  });



  // Test 2: The Missing Logo Edge Case
  it('renders the fallback image when logoURL is empty', () => {
    // 1. ARRANGE: Render the component using the mock data with an empty logoURL.
    render(<RestaurantCard restaurant={mockRestaurantNoLogo} />);

    // 2. ACT: (None required for initial render).

    // 3. ASSERT: Verify that the component falls back to the default placeholder image.
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', 'https://images.seeklogo.com/logo-png/40/1/just-eat-logo-png_seeklogo-408326.png');
  });

});