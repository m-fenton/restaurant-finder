// Represents a restaurant and normalises API data into a consistent format
// Safely handles missing API fields using optional chaining

class Restaurant {
  constructor(data) {
    this.name = data?.name || "";

    this.cuisines = this.createCuisinesString(data?.cuisines);

    this.rating = data?.rating?.starRating ?? 0;

    this.addressLine = data?.address?.firstLine || "";
    this.city = data?.address?.city || "";
    this.postcode = data?.address?.postalCode || "";

    this.fullAddress = this.getFullAddress();

    this.logoURL = data?.logoUrl || "";
  }

  // Creates a comma-separated string of cuisines
  createCuisinesString(cuisines) {
    let cuisinesString = "";

    if (Array.isArray(cuisines)) {
      const names = [];

      for (let i = 0; i < cuisines.length; i++) {
        const item = cuisines[i];

        if (item && item.name) {
          names.push(item.name);
        } else {
          names.push(item);
        }
      }

      cuisinesString = names.join(", ");
    }

    return cuisinesString;
  }

 // Builds a full address string from available parts
  getFullAddress() {
    let parts = [];

    if (this.addressLine) {
      parts.push(this.addressLine);
    }

    if (this.city) {
      parts.push(this.city);
    }

    if (this.postcode) {
      parts.push(this.postcode);
    }

    return parts.join(", ");
  }
}

export default Restaurant;
