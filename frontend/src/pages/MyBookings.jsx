import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("my-bookings/")
      .then((res) => setBookings(res.data))
      .catch(() => setError("Failed to load bookings"));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((booking) => (
        <div
          key={booking.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "8px",
            paddingBottom: "5px",
          }}
        >
          <p>
            🎟️ Event ID: {booking.event} | Seats booked:{" "}
            {booking.seats_booked}
          </p>
        </div>
      ))}
    </div>
  );
}
