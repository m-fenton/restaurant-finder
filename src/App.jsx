// Main App component for the Restaurant Finder application.
// Allows users to search for restaurants by postcode, fetches data from an API,
// and displays restaurant details such as name, cuisines, rating, and address.

import { useState } from "react";
import Restaurant from "./models/Restaurant";
import RestaurantCard from "./components/RestaurantCard/RestaurantCard";

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
    <div>
      <h1>Restaurant Finder</h1>
      <input
        type="text"
        placeholder="Enter postcode"
        value={postcode}
        onChange={(e) => {
          setPostcode(e.target.value);
          setError("");
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      {loading && <div>Loading...</div>}
      <button onClick={handleSearch} disabled={loading}>
        Search
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.name} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default App;

//     {restaurants.map((restaurant, index) => (
//       <div key={restaurant.name}>
//         <img
//           src={
//             restaurant.logoURL ||
//             "https://images.seeklogo.com/logo-png/40/1/just-eat-logo-png_seeklogo-408326.png"
//           }
//           alt={restaurant.name}
//           style={{ width: "100px", height: "auto" }}
//           onError={(e) => {
//             e.target.src =
//               "https://images.seeklogo.com/logo-png/40/1/just-eat-logo-png_seeklogo-408326.png";
//           }}
//         />
//         <h2>{restaurant.name}</h2>
//         <p>Cuisines: {restaurant.cuisines}</p>
//         <p>Star Rating: {restaurant.rating}</p>
//         <p>Address: {restaurant.fullAddress}</p>
//         <hr />
//       </div>
//     ))}
