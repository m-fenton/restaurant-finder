// This file contains the main App component for the Restaurant Finder application.
// It allows users to search for restaurants by postcode, fetches data from an API,
// and displays the results, including restaurant details such as name, cuisines, rating, and address.
import { useState } from "react";
import Restaurant from "./models/Restaurant";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [postcode, setPostcode] = useState(""); 

  const handleSearch = () => {
    if (!postcode) return;

    fetch(`/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`)
      .then((res) => res.json())
      .then((data) => {
        const rawRestaurants = data?.restaurants || [];
        const restaurantObjects = rawRestaurants.map((restaurant) => new Restaurant(restaurant));
        setRestaurants(restaurantObjects.slice(0, 10));
      })
      .catch((err) => console.error(err));
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
