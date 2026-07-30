// Django ke events/urls.py ka MERN version.

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { bookEvent, myBookings } = require('../controllers/bookingController');

// Django settings.py mein globally IsAuthenticated tha, isliye har route
// pe "protect" middleware manually laga rahe hain
router.get('/events', protect, getEvents);
router.post('/events', protect, createEvent);
router.get('/events/:id', protect, getEventById);
router.put('/events/:id', protect, updateEvent);
router.delete('/events/:id', protect, deleteEvent);

router.post('/events/:eventId/book', protect, bookEvent);
router.get('/my-bookings', protect, myBookings);

module.exports = router;

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: URL pattern "/events/:eventId/book" mein ":eventId" kya hai?
   A: Yeh ek route parameter (dynamic segment) hai - jaise Django ka
      "<int:event_id>". Express isse req.params.eventId ke through
      controller mein available kara deta hai (bookingController.js
      dekho).

2. Q: "/my-bookings" ko events routes wali file mein kyun rakha, alag
      file mein kyun nahi?
   A: Original Django project mein bhi MyBookingsView events/urls.py
      mein hi define thi (alag app nahi banayi thi) - structure ko as-is
      follow kiya taaki dono codebases ka mapping samajhna easy rahe.
===============================================================================
*/
