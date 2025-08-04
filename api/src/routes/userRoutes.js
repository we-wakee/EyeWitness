// routes/userRoutes.js
const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware= require('../middleware/auth')
const router = express.Router();


router.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
    });

    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//login 


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    const token = await user.getJWT();
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,           // ✅ false for localhost (no HTTPS in dev)
  sameSite: "Lax",         // ✅ Lax works fine for dev
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
    res.json({ message: "User Logged in successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get current user

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json(req.user); // req.user is already sanitized (no password)
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
  });

  res.status(200).json({ message: 'User logged out successfully' });
});

module.exports = router;
