import { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => {
        console.error(error);
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;