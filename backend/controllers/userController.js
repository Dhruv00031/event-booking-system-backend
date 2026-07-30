// Django ke users/views.py (RegisterView, LoginView) ka MERN version.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route  POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hashedPassword });
    const token = generateToken(user._id);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// @route  POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Login response mein sirf "token" hai, "message" nahi - yeh kyun?
   A: Original Django LoginView bhi sirf {"token": token.key} return
      karta tha (RegisterView mein message tha, LoginView mein nahi) -
      hum yahan original API contract ko as-is follow kar rahe hain
      taaki frontend bina badlaav ke connect ho sake.

2. Q: Django ke authenticate() function ka structure yahan kaise
      recreate kiya?
   A: authenticate() internally username se user dhoondh kar password
      hash match karta hai. Humne wahi 2 steps manually likhe:
      User.findOne({ username }) phir bcrypt.compare(password, user.password).

3. Q: Register ke time duplicate username check zaroori kyun hai jabki
      Mongoose schema mein "unique: true" already hai?
   A: Dono ek saath use karna best practice hai. Schema ka unique index
      DB level safety-net hai (race condition ya direct DB insert se
      bachata hai), lekin agar hum khud pehle check karke friendly error
      message ("Username already taken") bhejte hain, to user experience
      better hoti hai (warna raw MongoDB duplicate-key error milta).
===============================================================================
*/
