import api from "./axios";

/* Fetch all events */
export const fetchEvents = async () => {
  const res = await api.get("/events/");
  return res.data;
};

/* Create event (ADMIN only) */
export const createEvent = async (eventData) => {
  const res = await api.post("/events/create/", eventData);
  return res.data;
};

/* Book event */
export const bookEvent = async (eventId, seats) => {
  const res = await api.post(`/events/${eventId}/book/`, {
    seats_booked: seats,
  });
  return res.data;
};
