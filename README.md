# 🎟 Event Booking System (Full-Stack)

A full-stack Event Booking platform built using Django REST Framework and React.

This project simulates a real-world ticket booking system where users can browse events, book seats, and track their bookings securely.

---

## 🚀 Live Features

### 🔐 Authentication
- User registration
- Secure login with token-based authentication
- Protected routes

### 🎫 Event Management
- View available events
- Seat availability tracking
- Real-time seat updates
- Admin-only event creation

### 📦 Booking System
- Book multiple seats
- Transaction-safe booking (atomic operations)
- Prevents overbooking
- View personal bookings
- Timestamped bookings

### 🌙 UI Features
- Responsive design
- Clean card-based layout
- Global dark mode toggle
- Booking timeline view
- Dynamic seat progress bars

---

## 🛠 Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SQLite (Dev)
- Token Authentication
- Custom Permissions
- Atomic Transactions

### Frontend
- CSS (custom theme system)
- React
- Fetch API
- Dark Mode via CSS variables

---

## 🔐 API Endpoints

### Auth
POST `/api/register/`
POST `/api/login/`

### Events
GET `/api/events/`
POST `/api/events/` (Admin only)
GET `/api/events/<id>/`

### Bookings
POST `/api/events/<id>/book/`
GET `/api/my-bookings/`

---

## 🧠 What I Learned

- Designing REST APIs
- Token-based authentication
- Role-based access control
- Preventing race conditions using transactions
- Connecting React frontend with Django backend
- Managing global UI themes (Dark Mode)
- Building production-like booking logic

---

## 💡 Why This Project?

Most tutorials stop at CRUD.
This project implements:

✔ Real authentication  
✔ Permissions  
✔ Data validation  
✔ Booking constraints  
✔ UI/UX polish  
✔ Full frontend-backend integration  

It reflects how real backend systems work.

---

## 📌 Future Improvements

- Payment gateway integration
- Email confirmations
- Admin analytics dashboard
- Deployment on cloud
- Dockerization

---

## 👨‍💻 Author

Dhruv Bharadwaj  
B.Tech CSE  
Aspiring Backend Developer

---

