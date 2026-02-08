🎯 Event Booking System (Backend)

A backend REST API for managing events and handling seat bookings with proper authentication, permissions, and transactional safety.
Built to reflect real-world backend engineering practices using Django and Django REST Framework.

🚀 Features
🔐 Authentication

User registration

User login

Token-based authentication

Protected APIs (authenticated users only)

👨‍💼 Admin Capabilities

Create events

Update events

Delete events

Manage total and available seats

👤 User Capabilities

View all events

View event details

Book seats for events

View personal bookings

🧠 Backend Logic

Transaction-safe booking using database locking

Prevents overbooking

Automatic seat availability updates

Role-based access control (Admin vs User)

🛠 Tech Stack

Language: Python

Framework: Django, Django REST Framework

Database: SQLite (development)

Authentication: Token-based (DRF AuthToken)

Tools: Git, GitHub, Django Admin
