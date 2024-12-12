const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const cookieParser = require('cookie-parser');

// Use cookieParser middleware to handle cookies
router.use(cookieParser());

// Login Route

router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email.' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
        role,
      });
  
      await newUser.save();
  
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('Generated token:', token); // Add this log to check token creation

  
      res.status(201).json({
        message: 'User created successfully',
        token,
        userId: newUser._id,
        role: newUser.role,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  router.post('/login', async (req, res) => {
    const { email, password, role } = req.body; // Include role in the request body
  
    try {
      console.log('Received email:', email);
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
            if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Create JWT Token
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({
        message: 'Login successful',
        token,
        userId: user._id,
        role: user.role, // Send the role back
      });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

const verifyToken = require('../middlewares/verifyToken'); // Ensure this is the correct path
router.get('/api/current-user', verifyToken, (req, res) => {
  if (req.user) {
    return res.json({ user: req.user });
  }
  return res.status(401).json({ message: 'Not authenticated' });
});

  router.get('/api/current-user', verifyToken, (req, res) => {
    if (req.user) {
      return res.json({ user: req.user });
    }
    return res.status(401).json({ message: 'Not authenticated' });
  });
  
  

module.exports = router;
