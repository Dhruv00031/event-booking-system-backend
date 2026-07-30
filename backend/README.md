# Event Booking System (Backend) - MERN Version

Django REST Framework backend ka MERN (MongoDB + Express + Node.js) conversion.
Original: token auth (username/password), Event CRUD, seat-safe booking with
race-condition protection, "my bookings" view.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)

## Folder Structure
```
event-mern-backend/
├── config/db.js
├── models/User.js
├── models/Event.js           # pre-save hook: availableSeats = totalSeats on create
├── models/Booking.js
├── middleware/authMiddleware.js   # protect (JWT) + adminOnly (unused, future-proofing)
├── controllers/userController.js
├── controllers/eventController.js
├── controllers/bookingController.js   # atomic seat booking logic (the tricky part!)
├── routes/userRoutes.js
├── routes/eventRoutes.js
├── server.js
└── .env.example
```

## Setup Instructions

1. MongoDB URI ready rakho (local ya Atlas free cluster).
2. Install:
   ```bash
   npm install
   ```
3. `.env.example` → `.env` banao aur values fill karo:
   ```bash
   cp .env.example .env
   ```
4. Run:
   ```bash
   npm run dev
   ```
5. Server: `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/users/register` — body: `{ username, password }`
- `POST /api/users/login` — body: `{ username, password }` → returns `{ token }`

Har protected request ke Authorization header mein `Bearer <token>` bhejna hoga.

### Events (sab routes protected)
- `GET /api/events`
- `POST /api/events` — body: `{ title, date, location, totalSeats }`
- `GET /api/events/:id`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`
- `POST /api/events/:eventId/book` — body: `{ seatsBooked }`
- `GET /api/my-bookings`

## Sabse important concept: race-condition safe booking

Django wale original code mein `transaction.atomic()` + `select_for_update()`
use hota tha taaki 2 log ek saath booking karein to seats negative na ho jayein.

MERN mein iska equivalent `bookingController.js` ke andar hai — ek hi
`findOneAndUpdate()` query mein condition check (`availableSeats >= seatsRequested`)
aur decrement (`$inc`) dono ek saath, atomically hote hain. Yeh viva mein
sabse zyada poocha ja sakta hai, file ke andar detailed Hinglish notes hain.

## Ek observation (jo maine flag kiya)

Original Django project mein `events/permissions.py` ke andar `IsAdminOrReadOnly`
class bani thi, lekin `views.py` ke kisi bhi view mein wo use hi nahi ho rahi thi —
sab views sirf `IsAuthenticated` the. Maine MERN version mein bhi wahi behaviour
rakha (`adminOnly` middleware bana ke rakha hai par kisi route pe laga nahi),
taaki original API ka behaviour exactly match kare. Agar chaaho to "sirf admin
event delete/create kar sake" jaisa restriction easily add kar sakte hain.

## Django → MERN mapping (quick reference for viva)

| Django | MERN equivalent |
|---|---|
| Model + save() override | Mongoose Schema + `pre('save')` hook |
| ForeignKey | `mongoose.Schema.Types.ObjectId` + `ref` |
| select_related() | `.populate()` |
| transaction.atomic() + select_for_update() | atomic `findOneAndUpdate()` with condition |
| TokenAuthentication | JWT (jsonwebtoken) |
| IsAuthenticated (global default) | `protect` middleware on every route |
| settings.py DATABASES | config/db.js |
