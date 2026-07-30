// Django ke users/urls.py ka MERN version.

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Yeh routes "protect" middleware ke bina kyun hain?
   A: Register aur login khud authentication ka pehla step hain, user
      abhi tak logged-in nahi hai - Django mein bhi in dono views ka
      permission_classes = [] (koi restriction nahi) tha.
===============================================================================
*/
