// ============================================================
// navbar.js — har protected page (events.html, bookings.html) mein
// navbar ka logout button aur active-link highlight yahan se chalta hai.
// ============================================================

function initNavbar() {
  // Current page ke naam se active link pe highlight class laga do
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".navbar nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Logout button click hone par token clear karke login page pe bhej do
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearToken();
      window.location.href = "login.html";
    });
  }
}

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Active link highlight kaise kaam karta hai bina koi router
      library use kiye?
   A: window.location.pathname se current page ka naam nikal ke, har
      navbar link ke href attribute se compare kar rahe hain - jo match
      ho jaye usme "active" CSS class add kar dete hain (React Router
      ke useLocation() jaisa kaam manually).

2. Q: Yeh file saari protected pages mein <script> tag se load karni
      hoti hai, alag se import kyun nahi karte?
   A: Plain HTML/JS mein ES module import use nahi kar rahe (simplicity
      ke liye), isliye har page ke <script> tags order se load hote hain:
      pehle api.js (getToken/clearToken define karta hai), phir yeh
      navbar.js file jo unhi functions ko use karti hai.
===============================================================================
*/
