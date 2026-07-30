// Django ke events/models.py ke Booking model ka MERN version.

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Django: models.ForeignKey(User, ...)
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId, // Django: models.ForeignKey(Event, ...)
    ref: 'Event',
    required: true,
  },
  seatsBooked: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: { createdAt: 'bookedAt', updatedAt: false },
  // Django ka field naam "booked_at" tha, isliye yahan bhi wahi naam use kiya
});

module.exports = mongoose.model('Booking', bookingSchema);

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Django ke ForeignKey ka MERN/Mongoose equivalent kya hai?
   A: mongoose.Schema.Types.ObjectId ke saath "ref" property — yeh
      dusre collection (User/Event) ke document ka _id store karta hai,
      aur query ke time .populate() use karke us document ka pura data
      nikal sakte hain (Django ka select_related() jaisa).

2. Q: on_delete=models.CASCADE Mongoose mein kaise hota hai?
   A: MongoDB mein built-in cascade delete nahi hota jaisa SQL/Django
      mein hota hai. Agar zaroorat ho to hume manually likhna padta hai
      (jaise: User delete hone par uski saari Bookings bhi delete karo) -
      ya to controller mein ya Mongoose middleware (pre('remove')) se.

3. Q: related_name="bookings" (Django) ka MERN mein kya hota hai?
   A: MERN mein aisa koi direct concept nahi hai. Hum seedha
      Booking.find({ user: userId }) query likh kar related records
      nikal lete hain — jo function pehle se bookingController.js mein
      MyBookingsView ke liye bana hua hai.
===============================================================================
*/
