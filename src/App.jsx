import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/api/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return <h1>Restaurant Finder</h1>;
}

export default App;