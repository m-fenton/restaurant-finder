import "./RestaurantCard.css";

// Main Restaurant Card component
// Display split into text and image sections at either side of the card
function RestaurantCard({ restaurant }) {
  return (
    <div className="card-wrapper">
      {/* LEFT SIDE: Text Container */}
      <div className="card-text-container">
        <h2>{restaurant.name}</h2>
        <div className="subject-wrapper">
          <p className="sub-heading-text">Cuisines</p>
          <p className="cuisine-text">{restaurant.cuisines}</p>
        </div>
        <div className="subject-wrapper">
          <p className="sub-heading-text">Star Rating</p>
          <p className="rating-text">
            ★ {restaurant.rating || restaurant.starRating}
          </p>
        </div>
        <div className="subject-wrapper">
          <p className="sub-heading-text">Address</p>
          <p className="address-text">{restaurant.fullAddress}</p>
        </div>
      </div>

      {/* RIGHT SIDE: Logo */}
      <img
        className="card-logo"
        src={
          restaurant.logoURL ||
          "https://images.seeklogo.com/logo-png/40/1/just-eat-logo-png_seeklogo-408326.png"
        }
        alt={`${restaurant.name} logo`}
        onError={(e) => {
          e.target.src =
            "https://images.seeklogo.com/logo-png/40/1/just-eat-logo-png_seeklogo-408326.png";
        }}
      />
    </div>
  );
}

export default RestaurantCard;
