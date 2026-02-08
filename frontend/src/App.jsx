import { useEffect, useState } from "react";
import Login from "./pages/login";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import { setAuthToken } from "./api/axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      return true;
    }
    return false;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Booking System</h1>
      <Events />
      <hr />
      <MyBookings />
    </div>
  );
}

export default App;
