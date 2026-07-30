// Django ke manage.py + backend/urls.py + wsgi.py teeno ka combined
// MERN version - yahin se poora server start hota hai.

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

connectDB();

app.use(cors()); // Django ke CORS_ALLOW_ALL_ORIGINS = True jaisa (dev ke liye theek hai)
app.use(express.json());

// Django urls.py: path("api/", include("events.urls")) aur path("api/users/", include("users.urls"))
app.use('/api/users', userRoutes);
app.use('/api', eventRoutes); // isse /api/events, /api/my-bookings etc. banenge

app.get('/', (req, res) => {
  res.send('Event Booking System API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: cors() ko bina kisi options ke use kiya - production mein yeh
      sahi hai kya?
   A: Nahi, yeh sirf development ke liye theek hai (jaise Django ka
      CORS_ALLOW_ALL_ORIGINS = True bhi ek warning-worthy dev setting
      hai). Production mein cors({ origin: "https://yourfrontend.com" })
      jaisa specific origin dena chahiye.

2. Q: Do baar app.use() se routes mount kiye - dono mein farak?
   A: '/api/users' prefix userRoutes ke liye hai (register/login), aur
      '/api' prefix eventRoutes ke liye hai (jisme khud "/events" path
      likha hai routes file ke andar) - isliye final URL /api/events
      banta hai, exactly jaise Django ke urls.py mein tha.
===============================================================================
*/
