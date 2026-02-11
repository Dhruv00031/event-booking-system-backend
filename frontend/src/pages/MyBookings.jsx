import { useEffect, useState } from "react";
import api from "../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("my-bookings/")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((b) => (
        <div key={b.id} className="border p-3 mb-2">
          <p>{b.event.title}</p>
          <p>Seats booked: {b.seats_booked}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
