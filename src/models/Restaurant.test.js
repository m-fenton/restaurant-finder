import { describe, it, expect } from 'vitest';
import Restaurant from './Restaurant';

describe('Restaurant Class Data Normalization (Unit Test)', () => {

  // Test 1: The Happy Path
  it('correctly formats a perfect API response (Happy Path)', () => {
    // 1. ARRANGE: Initialize mock data representing a complete, perfect API response.
    const mockApiData = {
      name: "Martin's Pizza Palace",
      rating: { starRating: 4.8 },
      address: {
        firstLine: "123 React Way",
        city: "London",
        postalCode: "SW1A 1AA"
      },
      cuisines: [{ name: "Italian" }, { name: "Pizza" }],
      logoUrl: "https://freedesignfile.com/upload/2019/03/vector-logo-slice-of-pizza-and-ribbon.jpg"
    };

    // 2. ACT: Instantiate the Restaurant class with the mock data.
    const restaurant = new Restaurant(mockApiData);

    // 3. ASSERT: Verify that all properties are correctly parsed and normalized.
    expect(restaurant.name).toBe("Martin's Pizza Palace");
    expect(restaurant.rating).toBe(4.8);
    expect(restaurant.fullAddress).toBe("123 React Way, London, SW1A 1AA");
    expect(restaurant.cuisines).toBe("Italian, Pizza");
    expect(restaurant.logoURL).toBe("https://freedesignfile.com/upload/2019/03/vector-logo-slice-of-pizza-and-ribbon.jpg");
  });



  // Test 2: The Edge Case of Missing Data
  it('safely handles completely empty or missing API data', () => {
    // 1. ARRANGE: Initialize an empty object to simulate missing API data.
    const badApiData = {};

    // 2. ACT: Instantiate the Restaurant class with the empty data.
    const restaurant = new Restaurant(badApiData);

    // 3. ASSERT: Verify that fallbacks and optional chaining prevent undefined errors and return default values.
    expect(restaurant.name).toBe("");
    expect(restaurant.rating).toBe(0);
    expect(restaurant.fullAddress).toBe("");
    expect(restaurant.cuisines).toBe("");
    expect(restaurant.logoURL).toBe("");
  });



  // Test 3: Partial Data Handling
  it('formats the address correctly when parts are missing', () => {
    // 1. ARRANGE: Initialize mock data with a partial address object.
    const partialAddressData = {
      address: { city: "Manchester" }
    };

    // 2. ACT: Instantiate the Restaurant class with the partial data.
    const restaurant = new Restaurant(partialAddressData);

    // 3. ASSERT: Verify that the address is formatted cleanly without dangling commas.
    expect(restaurant.fullAddress).toBe("Manchester");
  });

});