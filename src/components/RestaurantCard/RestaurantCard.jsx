import "./RestaurantCard.css";

function RestaurantCard(props) {
  const restaurant = props.restaurant;

  return (
    <div>
      <img
        src={restaurant.logoURL || "https://placehold.co/100x100"}
        alt={restaurant.name}
        style={{ width: "100px", height: "auto" }}
        onError={(e) => {
          e.target.src = "https://placehold.co/100x100";
        }}
      />
      <h2>{restaurant.name}</h2>
      <p>Cuisines: {restaurant.cuisines}</p>
      <p>Star Rating: {restaurant.rating}</p>
      <p>Address: {restaurant.fullAddress}</p>
      <hr />
    </div>
  );
}

export default RestaurantCard;