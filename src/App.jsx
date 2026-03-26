// Main App component for the Restaurant Finder application.
// Allows users to search for restaurants by postcode, fetches data from an API,
// and displays restaurant details such as name, cuisines, rating, and address.

import { useState } from "react";
import Restaurant from "./models/Restaurant";
import RestaurantCard from "./components/RestaurantCard/RestaurantCard";
import "./app.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setRestaurants([]); // Clear previous results

    const validation = validatePostcode(postcode);

    if (validation.error) {
      setError(validation.error);
      setLoading(false);
      return;
    }

    setError(""); // Clear previous errors

    fetch(
      `/api/discovery/uk/restaurants/enriched/bypostcode/${validation.cleaned}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const rawRestaurants = data?.restaurants || [];

        if (rawRestaurants.length === 0) {
          setError("No restaurants found for this postcode");
          setRestaurants([]);
          setLoading(false);
          return;
        }

        // Convert raw data into Restaurant objects
        const restaurantObjects = rawRestaurants.map(
          (restaurant) => new Restaurant(restaurant),
        );
        setRestaurants(restaurantObjects.slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching data. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Restaurant Finder</h1>

      <div className="search-container">
        <input
          className="postcode-input"
          type="text"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button
          className="search-button"
          onClick={handleSearch}
          disabled={loading}
        >
          Search
        </button>
      </div>

      {loading && <div className="loading-text">Loading...</div>}
      {error && <p className="error-text">{error}</p>}

      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.name} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default App;
