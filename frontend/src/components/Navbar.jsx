import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Event Booking</h2>

      <div style={styles.links}>
        <Link
          to="/events"
          style={{
            ...styles.link,
            ...(location.pathname === "/events" ? styles.active : {}),
          }}
        >
          Events
        </Link>

        <Link
          to="/my-bookings"
          style={{
            ...styles.link,
            ...(location.pathname === "/my-bookings" ? styles.active : {}),
          }}
        >
          My Bookings
        </Link>

        <button onClick={onLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#2563eb",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  active: {
    textDecoration: "underline",
  },
  logout: {
    background: "#dc2626",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
