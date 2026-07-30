// ============================================================
// events.js — events list load karta hai, search filter lagata hai,
// aur har ticket card ke andar seat booking handle karta hai.
// ============================================================

requireAuth();
initNavbar();

const grid = document.getElementById("event-grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");

let allEvents = []; // saare events yahan store karte hain, search isi pe filter karta hai

// ---- Skeleton (loading placeholder) dikhana ----
function showSkeletons() {
  grid.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.className = "skeleton";
    grid.appendChild(div);
  }
}

// ---- Ek event ke liye ticket-card ka HTML banana ----
function renderEventCard(event) {
  const percentLeft = (event.availableSeats / event.totalSeats) * 100;

  // Seats kam bachi hon to color red/amber ho jaye - jaise React version mein tha
  let barColor = "#2f9e63"; // green
  if (percentLeft <= 20) barColor = "#d1453b"; // red
  else if (percentLeft <= 50) barColor = "#c98620"; // amber

  const card = document.createElement("div");
  card.className = "ticket";

  const eventDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  card.innerHTML = `
    <div class="ticket-info">
      <h3>${event.title}</h3>
      <p class="ticket-meta">📅 ${eventDate}</p>
      <p class="ticket-meta">📍 ${event.location}</p>
      <p class="seats-text">${event.availableSeats} / ${event.totalSeats} seats left</p>
      <div class="progress-track">
        <div class="progress-fill" style="width:${percentLeft}%; background:${barColor};"></div>
      </div>
    </div>
    <div class="ticket-stub">
      <input type="number" min="1" placeholder="Seats" class="seat-input" />
      <button class="btn-book">Book</button>
    </div>
  `;

  // Booking button ka click handler yahan attach kar rahe hain (inline onclick
  // se saaf rehta hai, event.title mein special characters se bhi dikkat nahi hoti)
  const seatInput = card.querySelector(".seat-input");
  const bookBtn = card.querySelector(".btn-book");

  if (event.availableSeats <= 0) {
    bookBtn.disabled = true;
    bookBtn.textContent = "Sold Out";
  }

  bookBtn.addEventListener("click", () => handleBook(event._id, seatInput, bookBtn));

  return card;
}

// ---- Booking ka actual API call ----
async function handleBook(eventId, seatInput, bookBtn) {
  const seatsBooked = parseInt(seatInput.value, 10);

  if (!seatsBooked || seatsBooked <= 0) {
    showToast("Enter a valid seat number", "warning");
    return;
  }

  bookBtn.disabled = true;
  bookBtn.textContent = "Booking...";

  try {
    await apiRequest(`/events/${eventId}/book`, {
      method: "POST",
      body: JSON.stringify({ seatsBooked }),
    });

    showToast("Booking successful 🎉", "success");
    seatInput.value = "";
    loadEvents(); // seats updated dikhane ke liye list refresh karo
  } catch (error) {
    showToast(error.message, "error");
    bookBtn.disabled = false;
    bookBtn.textContent = "Book";
  }
}

// ---- Search box se filter karna ----
function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = allEvents.filter((e) => e.title.toLowerCase().includes(query));
  renderList(filtered);
}

function renderList(events) {
  grid.innerHTML = "";

  if (events.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  events.forEach((event) => grid.appendChild(renderEventCard(event)));
}

// ---- Events load karna backend se ----
async function loadEvents() {
  showSkeletons();
  try {
    const data = await apiRequest("/events");
    allEvents = Array.isArray(data) ? data : [];
    applySearch(); // search box khaali ho to sab events dikhenge
  } catch (error) {
    showToast("Failed to load events", "error");
    grid.innerHTML = "";
  }
}

searchInput.addEventListener("input", applySearch);
loadEvents();

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Booking ke baad loadEvents() dobara kyun call kiya?
   A: Booking successful hone ke baad available seats badal jaate hain
      (backend mein $inc se decrement hota hai). Frontend ka data stale
      ho jayega jab tak hum fresh data fetch na karein - isliye poori
      list refresh kar dete hain taaki seats count aur progress bar
      turant update dikhein.

2. Q: innerHTML mein event.title seedha daalna safe hai kya?
   A: Production-grade app mein XSS (cross-site scripting) se bachne ke
      liye user-generated text ko escape karna chahiye. Yeh ek learning
      project hai isliye simple rakha hai, lekin real-world app mein
      textContent use karna ya proper sanitization karna better practice
      hai.

3. Q: allEvents aur filtered list do alag arrays kyun rakhe?
   A: allEvents hamesha backend se aaya poora (unfiltered) data rakhta
      hai. Jab bhi search box mein kuch type hota hai, hum allEvents
      se filter karte hain aur sirf render karte hain - iससे hume baar
      baar backend call karne ki zaroorat nahi padti, search turant
      (client-side) hoti hai.

4. Q: percentLeft ke hisaab se progress bar ka color kaise decide hota
      hai?
   A: (availableSeats / totalSeats) * 100 se percentage nikala. Agar
      20% se kam bacha hai to red, 50% se kam to amber, warna green -
      exactly React version wale logic jaisa, bas plain JS mein.
===============================================================================
*/
