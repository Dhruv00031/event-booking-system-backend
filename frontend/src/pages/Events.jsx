import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [seats, setSeats] = useState({});
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      const res = await api.get("events/");
      setEvents(res.data || []);
    } catch {
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await api.get("events/");
        if (isMounted) setEvents(res.data || []);
      } catch {
        if (isMounted) setError("Failed to load events");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("events/", { title });
      setTitle("");
      loadEvents();
    } catch {
      alert("Failed to create event");
    }
  };

  const handleBook = async (eventId) => {
    try {
      await api.post(`events/${eventId}/book/`, {
        seats_booked: Number(seats[eventId] || 1),
      });
      alert("Booking successful!");
      loadEvents();
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Events</h2>

      <form onSubmit={handleCreate} style={{ marginBottom: 16 }}>
        <input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {events.length === 0 && <p>No events available</p>}

      <div>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{event.title}</h3>
            {event.description && <p>{event.description}</p>}
            <p>
              📍 {event.location} | 🪑 Seats left: {event.available_seats}
            </p>

            <input
              type="number"
              min="1"
              placeholder="Seats"
              value={seats[event.id] || ""}
              onChange={(e) =>
                setSeats({
                  ...seats,
                  [event.id]: e.target.value,
                })
              }
            />
            <button onClick={() => handleBook(event.id)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}