import { useEffect, useState } from "react";
import { fetchEvents, bookEvent } from "../api/events";
import { toast } from "react-toastify";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [seats, setSeats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleBook = async (eventId) => {
    const seatsBooked = parseInt(seats[eventId]);

    if (!seatsBooked || seatsBooked <= 0) {
      toast.warning("Enter valid seat number");
      return;
    }

    try {
      await bookEvent(eventId, seatsBooked);
      toast.success("Booking successful 🎉");
      setSelectedEvent(null);
    } catch {
      toast.error("Booking failed");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 style={{ marginBottom: "20px" }}>Browse Events</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "30px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "15px",
        }}
      />

      {loading && <p>Loading events...</p>}

      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="card"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <h2 style={{ marginBottom: "8px" }}>{event.title}</h2>

          <p style={{ color: "#6b7280", marginBottom: "8px" }}>
            📍 {event.location}
          </p>

          {/* SEATS LEFT TEXT */}
          <p style={{ fontWeight: "500", marginBottom: "10px" }}>
            🪑 {event.available_seats} / {event.total_seats} seats left
          </p>

          {/* PROGRESS BAR */}
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                height: "8px",
                background: "#e5e7eb",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${
                    (event.available_seats / event.total_seats) * 100
                  }%`,
                  height: "100%",
                  background:
                    event.available_seats > event.total_seats * 0.5
                      ? "#16a34a"
                      : event.available_seats > event.total_seats * 0.2
                      ? "#f59e0b"
                      : "#dc2626",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>

          {/* BOOKING */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="number"
              placeholder="Seats"
              value={seats[event.id] || ""}
              onChange={(e) =>
                setSeats({ ...seats, [event.id]: e.target.value })
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <button
              onClick={() => setSelectedEvent(event)}
              style={{
                padding: "8px 16px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Book
            </button>
          </div>
        </div>
      ))}

      {filteredEvents.length === 0 && !loading && (
        <p style={{ textAlign: "center", color: "#777" }}>
          No events found.
        </p>
      )}

      {/* MODAL */}
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "350px",
            }}
          >
            <h3>Confirm Booking</h3>
            <p>{selectedEvent.title}</p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => handleBook(selectedEvent.id)}
                style={{
                  marginRight: "10px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                }}
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
