// what does my data look like and what rules must it follow



const mongoose = require("mongoose"); // a model only exists through mongoose   db itself doesn't enforce structue   mongoose does

const userSchema = new mongoose.Schema({ // a schema is blueprint  It defines: which field exist || what type they are || what rules they must follow
  email: { type: String, required: true, unique: true }, // email must be text , useer cannot exist w/o email , no two users share same email
  password: { type: String, required: true }, // this filed stores hashed password
  role: { type: String, enum: ["user", "admin"], default: "user" } // “Not all users should have same power.”  later someone became admin
});

module.exports = mongoose.model("User", userSchema);


/**
 * 
 🔗 How User.js fits into the WHOLE system

 Register flow
/auth/register
   ↓
User model validates data
   ↓
User saved to DB

Login flow
/auth/login
   ↓
User.findOne(email)
   ↓
Password compared

Profile flow
/profile
   ↓
req.user.userId
   ↓
User.findById()


 */


//User.js defines who a user is and what rules they must follow in the entire backend.