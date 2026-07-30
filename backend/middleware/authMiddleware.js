// Django ke TokenAuthentication + IsAuthenticated (global default permission)
// ka MERN version.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// protect -> login check karta hai (Django ka IsAuthenticated)
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authorized, token missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, invalid token' });
  }
};

// adminOnly -> filhal kisi route pe use nahi ho raha (original Django code
// mein bhi IsAdminOrReadOnly kahin wire nahi tha), lekin future-proofing
// ke liye rakha hai
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Only admin can perform this action' });
};

module.exports = { protect, adminOnly };

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Yeh middleware har route pe kyun lagega?
   A: Django settings.py mein REST_FRAMEWORK ke DEFAULT_PERMISSION_CLASSES
      mein globally IsAuthenticated set tha - matlab register/login chhod
      kar baaki sab routes ko login chahiye tha. Express mein aisi global
      setting nahi hoti, isliye humein "protect" middleware har protected
      route pe manually lagana padta hai (routes files mein dekhna).

2. Q: adminOnly middleware ka status abhi kya hai?
   A: File mein bana hua hai, exported bhi hai, lekin routes/eventRoutes.js
      mein kisi route pe attach nahi kiya gaya - bilkul jaise original
      Django project ke events/permissions.py mein IsAdminOrReadOnly class
      thi par views.py ke kisi bhi view mein use nahi ho rahi thi. Agar
      chaho to hum isse event delete route pe laga sakte hain.
===============================================================================
*/
