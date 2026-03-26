import { describe, it, expect } from 'vitest';
import Restaurant from './Restaurant';

describe('Restaurant Class Data Normalization', () => {

  it('correctly formats a perfect API response (Happy Path)', () => {
    // 1. Arrange: Perfect example of Just Eat API data to be fed into test
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

    // 2. Act: Run the data through my class
    const restaurant = new Restaurant(mockApiData);

    // 3. Assert: Test if my class correctly normalized the data
    expect(restaurant.name).toBe("Martin's Pizza Palace");
    expect(restaurant.rating).toBe(4.8);
    expect(restaurant.fullAddress).toBe("123 React Way, London, SW1A 1AA");
    expect(restaurant.cuisines).toBe("Italian, Pizza");
    expect(restaurant.logoURL).toBe("https://freedesignfile.com/upload/2019/03/vector-logo-slice-of-pizza-and-ribbon.jpg");
  });



  it('safely handles completely empty or missing API data', () => {
    // 1. Arrange: Provided completely empty API data to feed to my class
    const badApiData = {};

    // 2. Act: Run the data through my class
    const restaurant = new Restaurant(badApiData);

    // 3. Assert: My fallbacks and optional chaining should prevent 'undefined' errors
    expect(restaurant.name).toBe("");
    expect(restaurant.rating).toBe(0);
    expect(restaurant.fullAddress).toBe("");
    expect(restaurant.cuisines).toBe("");
    expect(restaurant.logoURL).toBe("");
  });



  it('formats the address correctly when parts are missing', () => {
    // 1. Arrange: Partial data set fed into class
    const partialAddressData = {
      address: { city: "Manchester" }
    };

    // 2. Act: Run the data through my class
    const restaurant = new Restaurant(partialAddressData);

    // 3. Assert: Test if my class correctly normalized the available data
    expect(restaurant.fullAddress).toBe("Manchester");
  });

});