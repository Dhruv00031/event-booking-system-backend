import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import { setAuthToken } from "./api/axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // Set token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Called after successful login
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        {/* PUBLIC ROUTE */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/events" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/events"
          element={
            isAuthenticated ? <Events /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/my-bookings"
          element={
            isAuthenticated ? <MyBookings /> : <Navigate to="/login" />
          }
        />

        {/* DEFAULT ROUTE */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/events" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
