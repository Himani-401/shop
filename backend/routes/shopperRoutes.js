// /routes/shopperRoutes.js
const express = require('express');
const router = express.Router();

// Example route: Get shopper profile
router.get('/profile', (req, res) => {
  // Logic to retrieve shopper profile
  res.json({ message: 'Shopper profile' });
});

module.exports = router;
