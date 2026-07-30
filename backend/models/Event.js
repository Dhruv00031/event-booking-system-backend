// Django ke events/models.py ke Event model ka MERN version.

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 0,
  },
  availableSeats: {
    type: Number,
    min: 0,
    // required nahi rakha kyunki hum isko pre-save hook mein khud set
    // karenge - user ko yeh field bhejne ki zaroorat nahi
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: false },
});

// Django ke model.save() override jaisa - "if not self.pk: available_seats = total_seats"
// Mongoose mein "pre('save')" hook use karte hain jo save hone se pehle chalta hai
eventSchema.pre('save', function (next) {
  // this.isNew batata hai ki document pehli baar create ho raha hai ya update
  if (this.isNew) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Django ke save() method override ka MERN equivalent kya hai?
   A: Mongoose ke "pre-save hooks" (middleware). schema.pre('save', fn)
      document database mein save hone se THEEK PEHLE chalta hai - yahan
      hum isse use karke available_seats ko total_seats ke barabar set
      kar rahe hain, lekin sirf pehli baar (create ke time).

2. Q: this.isNew kaise pata karta hai ki document naya hai ya nahi?
   A: Mongoose khud track karta hai ki document abhi tak database mein
      save hua hai ya nahi. Django mein hum "if not self.pk" check karte
      the (pk hoga tabhi jab record already DB mein ho) - dono ka concept
      same hai.

3. Q: pre-save hook mein arrow function use kyun nahi kiya?
   A: Arrow function apna khud ka "this" nahi banata (outer scope ka
      "this" use karta hai), isliye Mongoose document (jispe hume
      this.totalSeats access karna hai) available nahi hoga. Isliye
      normal function() {} use kiya.

4. Q: "next()" call karna kyun zaroori hai hook ke andar?
   A: Yeh Mongoose ko batata hai ki hook ka kaam ho gaya, ab save
      operation aage badh sakta hai. Agar next() call nahi karenge to
      save() hamesha ke liye atak jayega.
===============================================================================
*/
