// ============================================================
// api.js — saari pages is file ko <script> tag se load karti hain.
// Yeh file token store/read karna aur backend ko fetch() calls
// bhejna handle karti hai — React wale AuthContext.jsx +
// api/axios.js ka combined kaam yahan plain JS mein hota hai.
// ============================================================

const API_BASE = "http://localhost:5000/api";

// ---- Token helpers (localStorage mein store karte hain) ----
function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function clearToken() {
  localStorage.removeItem("token");
}

// ---- Har protected page ke top pe call karo ----
// Agar token nahi mila to seedha login page pe bhej dete hain
function requireAuth() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}

// ---- Main fetch wrapper ----
// path: jaise "/events" ya "/my-bookings" (API_BASE khud add ho jayega)
// options: fetch() ke normal options (method, body, etc.)
async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Agar login token available hai, to Authorization header apne aap laga do
  // Django TokenAuth mein "Token <key>" format tha, hamare JWT backend
  // mein "Bearer <token>" format chahiye
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  // Response ko JSON mein parse karne ki koshish karo
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    // Agar token invalid/expired hai to seedha login pe bhej do
    if (response.status === 401) {
      clearToken();
      window.location.href = "login.html";
    }
    // Backend hamesha { error: "..." } format mein error bhejta hai
    throw new Error((data && data.error) || "Something went wrong");
  }

  return data;
}

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: fetch() aur axios mein kya farak hai? Yahan fetch() kyun use kiya?
   A: fetch() browser ka built-in function hai, extra library install
      karne ki zaroorat nahi (React version mein axios use hua tha, jo
      ek npm package hai). Plain HTML/JS project mein fetch() zyada
      beginner-friendly hai kyunki koi build step ya import syntax nahi
      chahiye.

2. Q: fetch() by default response.ok false kab karta hai?
   A: fetch() sirf network fail hone par khud error throw karta hai
      (jaise internet na ho). 400/401/404/500 jaise HTTP error status
      codes ke liye fetch() error nahi deta - isliye humein khud
      "if (!response.ok)" check karke error throw karna padta hai.

3. Q: localStorage kya hai, aur token yahan kyun store kar rahe hain?
   A: Browser ka built-in storage jo data ko refresh/close ke baad bhi
      rakhta hai. Login token yahan store karte hain taaki user ko
      har page reload pe dobara login na karna pade - JWT token khud
      hi expiry tak valid rehta hai.

4. Q: Django ke "Token <key>" aur is project ke "Bearer <token>" mein
      kya farak hai?
   A: Dono sirf Authorization header ka format/prefix hai jo backend
      expect karta hai. Django REST Framework ka TokenAuthentication
      "Token" prefix chahta tha, hamara JWT-based Node backend
      "Bearer" prefix industry-standard convention follow karta hai.
===============================================================================
*/
