// Yeh file sirf ek kaam karti hai: MongoDB se connect karna.

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // DB ke bina server chalane ka fayda nahi
  }
};

module.exports = connectDB;

/*
==========================================
1. Q: Yeh file kis kaam ki hai?
   A: Mongoose ke through MongoDB database se connection banati hai -
      Django mein yeh kaam settings.py ke DATABASES config se hota tha.

2. Q: process.exit(1) kyun likha hai?
   A: Agar DB connect na ho paye, to app ke liye aage kaam karna
      possible nahi (koi bhi query fail hogi), isliye process ko turant
      band kar dete hain taaki galti se broken server na chale.
===============================================================================
*/
