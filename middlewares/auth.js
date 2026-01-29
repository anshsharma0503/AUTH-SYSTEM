// this folder ans one critical que -> who is allowed to pass and who must be stopped

const jwt = require("jsonwebtoken");// JWT is used to verify token not to create them
// tokens are created in routes/auth.js || tokens are verified in middlewares/auth.js  

const authMiddleware = (req, res, next) => { // middleware is a functioon that : runs before route handlers , can stop a request  , can modify the request
  const authHeader = req.headers.authorization; // Read Authorization header||  This reads: Authorization: Bearer <token>  If this header is missing → user is anonymous.

  if (!authHeader || !authHeader.startsWith("Bearer ")) { // Check header existence & format  || w/o strict format : token extraction becomes unreliable , security bugs creep in
    return res.status(401).json({ message: "Access denied" });  // Reject if invalid
  }

  const token = authHeader.split(" ")[1];  // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token ||  this checks : token's signature , expiry and integrity
    req.user = decoded; // Attach identity
    next(); // Allow request to continue ||  w/o next() -> request would hang , no response would be sent
  } catch (err) { // Catch invalid token
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;


/**
 🔗 How auth.js (middleware) fits into the WHOLE system

 Client sends request
   ↓
authMiddleware runs
   ↓
Token verified
   ↓
req.user attached
   ↓
Route runs
   ↓
DB accessed
   ↓
Response sent

 */
