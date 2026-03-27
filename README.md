# Just Eat Restaurant Finder

A React web app that fetches and displays restaurant data based on a user-provided postcode using the Just Eat API.

## 🚀 Tech Stack
* **Frontend:** React.js (Built with Vite)
* **Testing:** Vitest, React Testing Library, user-event
* **Styling:** Standard CSS (Co-located by component)

---

## 🛠️ How to Build and Run the Solution

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/m-fenton/restaurant-finder.git
   ```
2. Navigate into the project directory:
   ```bash
   cd restaurant-finder
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the local development server, run:
```bash
npm run dev
```
Open your browser and navigate to the local host address provided in your terminal (typically `http://localhost:5173`).

**Important Note on CORS:** I ran into a CORS issue early on where the Just Eat API blocked direct requests from localhost. I've spent hours circling the drain on CORS issues in past projects, so this time I quickly set up a Vite proxy in `vite.config.js`. It was a straightforward fix that kept me moving without needing to build a separate backend.

---

## 🧠 Development Process & Preparation

* **Preparation:** Anticipating this assessment, I spent some time recently converting an old Vanilla JS project into React just to get familiar with this specific workflow. It definitely paid off here!
* **Data-First Approach:** My very first step was setting up a raw fetch environment to pull the entire JSON data package. I wanted to thoroughly analyse the shape of the data and plan my structures before writing any UI code.
* **Version Control:** I tried my best to stick to Git Conventional Commits (using prefixes like `feat:`, `chore:`, `test:`) to keep the history clean and readable.

---

## 🏛️ Architecture & Design Choices

* **Object-Oriented Programming (OOP):** Drawing on my full-stack experience with Go and JavaScript, I wanted to prioritize data integrity on the client side. I built a `Restaurant` class to act as a normalisation layer—it takes the messy raw API data and delivers a clean, predictable object for the UI to use.
* **Safe Data Parsing:** While building this, I learned about optional chaining (`?.`) and loved it. It was a much cleaner and more efficient way to handle edge cases and missing data without writing out a bunch of provisional code.
* **Component Reusability & Co-location:** I wanted the UI to be reusable, similar to a social network project I built in the past. For styling, I kept the CSS files co-located with their specific components. I read that this is a React standard and it keeps things much tidier than one massive global stylesheet.
* **Bulletproof Input Validation:** I wanted the postcode search to be bulletproof. I found a solid Regex pattern that handles extra spaces, is case-insensitive, and catches all the iterations of UK postcode formats (like `z1 1zz`, `zz1 1zz`, `zz1z 1zz`).
* **UI Enhancements:** The brief only asked for four data points, but I made the decision to pull the `logoUrl` from the data as well to give the UI a visual element. I also added a Just Eat placeholder image just in case the link was broken or missing.

---

## 🧪 Testing

Testing in React was new territory for me as most of my testing experience is with Go backend database CRUD actions. I used AI as a pair-programming partner to help me learn the ropes of React Testing Library. 

I wanted to make sure I hit the "Arrange, Act, Assert" pattern and included examples of unit, component, and integration testing to demonstrate my ability to pick up new frameworks.

To run the test suite, use:
```bash
npm run test
```

**Testing Coverage Includes:**
* **Unit Testing (`Restaurant.test.js`):** Tests the pure JavaScript data normalisation logic and edge-case handling.
* **Component Testing (`RestaurantCard.test.jsx`):** Checks that UI components render correctly and handle visual fallbacks.
* **Integration Testing (`App.test.jsx`):** Simulates user interaction and mocks the global `fetch` API so the tests don't rely on the real internet.

---

## 🚧 Assumptions & Trade-offs

* **Spatial Distance vs. Array Order:** I briefly assumed I would need to find the geographically "closest" restaurants to the postcode. I went down a rabbit hole preparing to use the Haversine formula to calculate the shortest distance on a sphere using geocoded coordinates! Ultimately, I realized the API didn't strictly require geographic sorting, so I made the trade-off to rely on the API's default return order to keep things simple.
* **Data Limiting:** The brief asked for a limit of 10 restaurants. Based on a previous GraphQL charting project I did, I decided the easiest way to handle this without a backend was just slicing the array in the React state (`slice(0, 10)`).

---

## 🔮 Future Improvements

If I had more time to extend this project, I would add:
1. **Geolocation API Integration:** Building on my initial geographic research, I'd love to hook up the browser's Geolocation API so users can just click "Find restaurants near me" to auto-fill their coordinates.
2. **Client-Side Filtering:** Since the API returns cuisines, I'd add a UI filter system so users can sort the current list by specific categories (e.g., Italian, Burgers) natively in React.
3. **Real Pagination/Infinite Scroll:** Instead of a hard limit of 10, I'd explore passing limit/offset parameters to the API to let users load more results as they scroll.
4. **Enhanced Loading States:** Replacing the standard "Loading..." text with modern, animated shimmer skeleton cards to make the app feel faster.