# Event Booking System — Frontend (Plain HTML/CSS/JS)

React nahi — plain HTML, CSS, aur vanilla JavaScript se banaya gaya hai.
MERN backend (`event-mern-backend`) se `fetch()` API calls ke through connect hota hai.

## Design concept
Event ticket stub — har event card ek asli ticket jaisa dikhta hai (dashed
perforation line + punch-hole circles), left side event info, right side
seats-booking stub.

## Folder Structure
```
frontend-plain/
├── index.html          # entry point, auth ke hisaab se redirect karta hai
├── login.html           # login + register (same page, toggle button se)
├── events.html          # event list, search, booking
├── bookings.html         # "my bookings" list
├── css/style.css        # poora design system yahi ek file mein hai
└── js/
    ├── api.js           # token storage + fetch wrapper (sabse important file)
    ├── toast.js          # custom notification (no library)
    ├── navbar.js          # logout + active-link highlight
    ├── login.js
    ├── events.js
    └── bookings.js
```

## Setup

1. Backend (`event-mern-backend`) already `http://localhost:5000` pe chal
   raha hona chahiye.
2. Is folder ko kisi bhi static server se serve karo (browser mein seedha
   file khol ke bhi kaam karega, but VS Code ka **Live Server** extension
   use karna recommended hai — right-click `index.html` → "Open with Live Server").
3. Browser mein khulega → login page pe redirect hoga.
4. "Create an account" se pehle register karo, phir events browse/book karo.

## Backend URL change karni ho to

`js/api.js` ke top pe yeh line hai:
```js
const API_BASE = "http://localhost:5000/api";
```
Deployment ke time (jaise Render pe backend deploy karne ke baad) bas yahi
line update karni hogi.

## Purane React frontend ka kya karein?

Repo ke `frontend/` folder mein jo React+Vite wala frontend hai, use touch
karne ki zaroorat nahi — yeh naya `frontend-plain/` folder uske alag/parallel
hai. Chaho to purane wale ko delete kar sakte ho ya reference ke liye rakh
sakte ho.
