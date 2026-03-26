import { render, screen } from '@testing-library/react';
import RestaurantCard from './RestaurantCard';

// Arrange 1: Perfect mock data provided for the Happy Path 
const mockRestaurant = {
  name: "Martin's Pizza Palace",
  cuisines: "Italian, Pizza",
  rating: "4.8",
  fullAddress: "123 React Way, London, SW1A 1AA",
  logoURL: "https://freedesignfile.com/upload/2019/03/vector-logo-slice-of-pizza-and-ribbon.jpg"
};

// Arrange 2: Providing mock data to test edge case (NO logo)
const mockRestaurantNoLogo = {
  name: "Ghost Kitchen",
  cuisines: "Burgers",
  rating: "3.5",
  fullAddress: "Unknown Location",
  logoURL: "" 
};

// One describe block that groups all tests for this specific component together
describe('RestaurantCard Component', () => {
  
  // Test #1: The Happy Path
  it('renders the restaurant details correctly on the screen', () => {
    // Arrange: Render the component to the virtual screen using mock data from Arrange 1
    render(<RestaurantCard restaurant={mockRestaurant} />);

    // Assert: Check text
    expect(screen.getByText("Martin's Pizza Palace")).toBeInTheDocument();
    expect(screen.getByText("Italian, Pizza")).toBeInTheDocument();
    expect(screen.getByText("123 React Way, London, SW1A 1AA")).toBeInTheDocument();

    // Assert: Check image
    const logoImage = screen.getByRole('img');
    expect(logoImage).toHaveAttribute('src', 'https://freedesignfile.com/upload/2019/03/vector-logo-slice-of-pizza-and-ribbon.jpg');
  });

  // Test #2: The Missing Logo Edge Case
  it('renders the fallback image when logoURL is empty', () => {
    // Arrange: Render the component to the virtual screen using mock data from Arrange 2
    render(<RestaurantCard restaurant={mockRestaurantNoLogo} />);

    // Assert: Check image
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', 'https://images.seeklogo.com/logo-png/40/1/just-eat-logo-png_seeklogo-408326.png');
  });

});