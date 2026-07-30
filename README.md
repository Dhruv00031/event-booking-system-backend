# 🎟️ Event Booking System

A full-stack **Event Booking System** built using the **MERN Stack**. The application allows users to browse events, book seats securely, and manage their bookings through a clean and responsive interface.

This project was developed with a beginner-friendly architecture using **Express.js**, **MongoDB**, and **Plain HTML, CSS & JavaScript** without any frontend frameworks.

---

# ✨ Features

## 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

---

## 🎫 Event Management

- View Available Events
- Search Events
- Event Details
- Seat Availability
- Real-time Seat Updates

---

## 📅 Booking System

- Book Event Seats
- Prevent Overbooking
- View My Bookings
- Booking History

---

## 🎨 Frontend

- Plain HTML5
- CSS3
- Vanilla JavaScript
- Responsive Design
- Toast Notifications
- Dynamic API Integration

---

## ⚙ Backend

- RESTful APIs
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Password Hashing (bcrypt)
- MVC Folder Structure

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

---

# 📁 Project Structure

```
event_booking_system/

│
├── backend/
│
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── events.html
│   ├── bookings.html
│   └── README.md
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Dhruv00031/event-booking-system-backend.git
```

## Move into Project

```bash
cd event_booking_system
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Server starts on

```
http://localhost:5000
```

---

# Frontend Setup

Open

```
frontend/index.html
```

using **Live Server** in VS Code.

---

# Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📌 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Events

```
GET /api/events

GET /api/events/:id
```

## Bookings

```
POST /api/events/:eventId/book

GET /api/my-bookings
```

---

# 📚 Key Concepts Used

- REST API Development
- JWT Authentication
- Password Hashing
- MongoDB CRUD Operations
- MVC Architecture
- Atomic Seat Booking Logic
- Client-Server Communication
- Fetch API
- DOM Manipulation
- Responsive Web Design

---

# 🚀 Future Improvements

- Dashboard
- Event Images
- Event Categories
- Profile Page
- Booking Confirmation Page
- Admin Panel
- Analytics Dashboard
- Email Notifications
- QR Code Tickets
- Dark Mode

---

# 👨‍💻 Author

**Dhruv Bharadwaj**

B.Tech Computer Science Engineering

GitHub

https://github.com/Dhruv00031

---

⭐ If you found this project helpful, consider giving it a star.
