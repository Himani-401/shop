// routes/sellerRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Your seller routes here
router.get('/', authMiddleware, (req, res) => {
  res.send('Seller Dashboard');
});

module.exports = router;
