// Main App component for the Restaurant Finder application.
// Allows users to search for restaurants by postcode, fetches data from an API,
// and displays restaurant details such as name, cuisines, rating, and address.

import { useState } from "react";
import Restaurant from "./models/Restaurant";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");

  // Validates the postcode format using a regex
  function validatePostcode(input) {
    let cleaned = input.trim();

    if (!cleaned) {
      return { error: "Please enter a postcode" };
    }

    const regex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
    if (!regex.test(cleaned)) {
      return { error: "Please enter a valid postcode" };
    }

    return { cleaned };
  }

  // Fetches restaurants for a validated postcode
  const handleSearch = () => {
    setRestaurants([]); // Clear previous results

    const validation = validatePostcode(postcode);

    if (validation.error) {
      setError(validation.error);
      return;
    }

    setError(""); // Clear previous errors

    fetch(`/api/discovery/uk/restaurants/enriched/bypostcode/${validation.cleaned}`)
      .then((res) => res.json())
      .then((data) => {
        const rawRestaurants = data?.restaurants || [];

        if (rawRestaurants.length === 0) {
          setError("Please enter a valid postcode");
          setRestaurants([]);
          return;
        }

        // Convert raw data into Restaurant objects
        const restaurantObjects = rawRestaurants.map(
          (restaurant) => new Restaurant(restaurant),
        );
        setRestaurants(restaurantObjects.slice(0, 10));
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching data. Please try again.");
      });
  };

  return (
    <div>
      <h1>Restaurant Finder</h1>
      <input
        type="text"
        placeholder="Enter postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {restaurants.map((restaurant, index) => (
        <div key={index}>
          <img
            src={restaurant.logoURL}
            alt={restaurant.name}
            style={{ width: "100px", height: "auto" }}
          />
          <h2>{restaurant.name}</h2>
          <p>Cuisines: {restaurant.cuisines}</p>
          <p>Star Rating: {restaurant.rating}</p>
          <p>Address: {restaurant.fullAddress}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;