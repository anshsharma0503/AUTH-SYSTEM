// this files handles authentication actions: register   login

const express = require("express"); // nedded express to  create routes , handle requests and responses
const bcrypt = require("bcryptjs"); // used only for password security  hash password on register  compare password on login   ||  w/o bcrypt storing passwords would be dangerous and unacceptable
const jwt = require("jsonwebtoken"); // used to : create tokens on login , encode user identity  ||  this is what enables stateless authentication
const User = require("../models/User"); //connects  routes  -> data layer

const router = express.Router(); // this creates a mini express app.   "all routes in this file belong together" 

router.post("/register", async (req, res) => { // http method : post URL : /auth/register  || post is used because : you are creating data , sending sensitive data (password) 
  const { email, password } = req.body; // User sends data → backend reads it.
  if (!email || !password) { // Validate input
    return res.status(400).json({ message: "Email and password required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  } // Check existing user

  const hashedPassword = await bcrypt.hash(password, 10); // plain password is never stored | hash is irreversible
  await User.create({ email, password: hashedPassword }); // save user (now the user exists in DB)

  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => { // this route proves "you are who you claim to be"
  const { email, password } = req.body; // read i/p

  const user = await User.findOne({ email }); // find user
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  } // if user don.t exists reject

  const token = jwt.sign(// create token   this is the moment auth becomes stateless
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  ); // this token contains: who you are(userId) , what power you have(role) 

  res.json({ token }); // return token
});

module.exports = router;


/*
How auth.js fits into the WHOLE system

User registers → user stored
User logs in → token issued

Every future request:
→ must include token
→ middleware verifies token
→ route trusts middleware

*/