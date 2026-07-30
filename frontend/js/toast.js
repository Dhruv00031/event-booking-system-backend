// ============================================================
// toast.js — chhota sa custom notification system.
// React version mein "react-toastify" library use hui thi, yahan
// hum khud 15 lines mein wahi kaam kar rahe hain (beginner-friendly).
// ============================================================

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // 2.5 second baad toast apne aap hat jayega
  setTimeout(() => toast.remove(), 2500);
}

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: External library (react-toastify) ke bina toast kaise banaya?
   A: document.createElement() se ek naya <div> banaya, usme class aur
      text daala, page mein append kar diya, aur setTimeout() se 2.5
      second baad usko remove() kar diya - itna hi kaafi hai simple
      notification ke liye.

2. Q: setTimeout() yahan kya kaam karta hai?
   A: Ek function ko diye gaye time (milliseconds) ke baad ek baar
      chalata hai - yahan 2500ms (2.5 sec) baad toast.remove() call
      hoga jo us div ko DOM se hata dega.
===============================================================================
*/
