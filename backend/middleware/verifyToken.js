const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies
  
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });  // Added clarification about expired token
    }
    req.user = decoded;  // Attach the user info to the request object
    next();  // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
