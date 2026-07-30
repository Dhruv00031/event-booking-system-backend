// ============================================================
// bookings.js — logged-in user ki saari bookings fetch aur render
// karta hai.
// ============================================================

requireAuth();
initNavbar();

const list = document.getElementById("bookings-list");
const emptyState = document.getElementById("empty-state");
const loadingState = document.getElementById("loading-state");

// ---- Ek booking ke liye card ka HTML banana ----
function renderBookingCard(booking) {
  // "event" field backend se populate() hoke poora object ke roop mein aata hai
  // (dekh lo bookingController.js ka myBookings function)
  const event = booking.event;

  const card = document.createElement("div");
  card.className = "booking-ticket";

  const eventDate = event
    ? new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "N/A";

  card.innerHTML = `
    <div>
      <h3>${event ? event.title : "Event no longer available"}</h3>
      <p class="ticket-meta">📅 ${eventDate} &nbsp;·&nbsp; 📍 ${event ? event.location : "-"}</p>
    </div>
    <div class="seats-badge">${booking.seatsBooked} seat${booking.seatsBooked > 1 ? "s" : ""}</div>
  `;

  return card;
}

// ---- Bookings load karna backend se ----
async function loadBookings() {
  try {
    const data = await apiRequest("/my-bookings");
    loadingState.style.display = "none";

    if (!Array.isArray(data) || data.length === 0) {
      emptyState.style.display = "block";
      return;
    }

    data.forEach((booking) => list.appendChild(renderBookingCard(booking)));
  } catch (error) {
    loadingState.style.display = "none";
    showToast("Failed to load bookings", "error");
  }
}

loadBookings();

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: booking.event kabhi null/undefined ho sakta hai kya, aur kyun
      check kiya "event ? ... : ..."?
   A: Haan - agar future mein event delete ho jaye (deleteEvent
      controller se) to us event ka reference Booking document mein
      reh jayega lekin populate() ke time kuch nahi milega (MongoDB
      cascade delete nahi karta, jaisa Booking.js model file mein bhi
      note kiya tha). Isliye "event ? ... : 'Event no longer available'"
      jaisa fallback rakha taaki app crash na ho.

2. Q: Yeh page events.js jaisa "search allEvents array" pattern kyun
      nahi use karta?
   A: Bookings list generally chhoti hoti hai (ek user ki apni
      bookings), isliye client-side search ki zaroorat nahi mehsoos
      hui - agar chaho to easily add ho sakta hai events.js jaisa hi
      pattern follow karke.
===============================================================================
*/
