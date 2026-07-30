// Django ke built-in User model ka MERN version.
// Note: original Django UserRegisterSerializer sirf username + password
// leta tha (email nahi), isliye yahan bhi wahi 2 fields rakhe hain.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, // hashed password store hoga
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // Note: original Django project mein events/permissions.py ke andar
  // IsAdminOrReadOnly class bani to thi, lekin views.py mein use hi
  // nahi hui thi (sab views IsAuthenticated the). Humne role field
  // yahan rakha hai taaki future mein admin-only features (jaise
  // event delete sirf admin kar sake) aasani se add ho sakein.
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

/*
==========================================

1. Q: Original Django project mein email field kyun nahi thi?
   A: UserRegisterSerializer mein sirf ("username", "password") fields
      the — email register/login flow mein use hi nahi ho raha tha,
      isliye MERN version mein bhi humne wahi minimal fields rakhe hain
      (scope ko bina wajah expand nahi kiya).

2. Q: role field ka abhi kya use hai?
   A: Filhal koi route isse restrict nahi karta (original Django code
      mein bhi IsAdminOrReadOnly kahin use nahi ho raha tha) — lekin
      yeh field rakha hai taaki agar aage "sirf admin event delete kar
      sake" jaisa feature chahiye ho, to seedha middleware laga sakein.
===============================================================================
*/
