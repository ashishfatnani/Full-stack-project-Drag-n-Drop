// authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = "ashishfatnani"; // You should use an environment variable for secretKey in production

// Middleware to protect routes requiring authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting "Bearer token"

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid Token");
    }
    req.user = user; // Attach the decoded user info to the request
    next();
  });
};

module.exports = authenticateJWT;
