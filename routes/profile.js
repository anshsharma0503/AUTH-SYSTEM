// this file exists to prove that authentication works

const express = require("express"); // nedded to create routes
const authMiddleware = require("../middlewares/auth"); // before you run this route, check who the user is || w/o this file: anyone could acess profile , your auth system would be meaningless
const User = require("../models/User");// used to fetch data after identity is verified
// identity is verified by middleware   data is fetched by route 

const router = express.Router(); // groups all profile related routes

router.get("/", authMiddleware, async (req, res) => {// this line is the entire security model
  // what it means 1. request arrives at /profile 2 . authMiddleware runs first 3. only if midlleware allows -> route runs
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);// sends response
});
/**
 * inside the route 
 
 acessing identity
 req.user.userId
Where did this come from?

👉 Not from this file.
👉 It was attached by authMiddleware.

This is why:
Routes trust middleware.

Fetch user
User.findById(req.user.userId)

Now that identity is verified, it’s safe to fetch user data.

Excluding password
.select("-password");


This explicitly removes password from response.
Even though password is hashed:
It should NEVER leave backend
Not even accidentally
 */

module.exports = router;



/**
  How profile.js fits into the WHOLE system


POST /auth/login
   ↓
Token issued

GET /profile (with token)
   ↓
authMiddleware verifies token
   ↓
req.user created
   ↓
profile route fetches user
   ↓
response sent
 */



//profile.js is a protected route that only works because middleware verifies identity before data access.