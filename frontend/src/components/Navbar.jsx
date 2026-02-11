import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ onLogout }) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const activeStyle = (path) => ({
    color: location.pathname === path ? "#fff" : "#dbeafe",
    textDecoration: "none",
  });

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <h2>Event Booking</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/events" style={activeStyle("/events")}>
          Events
        </Link>

        <Link to="/my-bookings" style={activeStyle("/my-bookings")}>
          My Bookings
        </Link>

        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          onClick={onLogout}
          style={{
            background: "#dc2626",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
