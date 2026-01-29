const mongoose = require("mongoose");  //Imports mongoose

//Mongoose is the tool that lets Node.js talk to MongoDB

const connectDB = async () => { //Creates a function whose only responsibility is to connect to the database
  try {
    await mongoose.connect(process.env.MONGO_URI); //Connects Node.js to MongoDB    Uses the connection string from .env
    // uses .env because DB url is sensitive   different url use different DBs   (like using the secret db address)
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed");
    process.exit(1);
  } // if DB connection failed - print error and kill the server
};

module.exports = connectDB;  // makes connectDB usable in other files

/*
🔗 How db.js fits into the WHOLE system

server.js
   ↓
connectDB()
   ↓
MongoDB connected
   ↓
Express starts
   ↓
Routes accept requests
   ↓
Auth routes use User model
   ↓
User model uses mongoose
   ↓
Mongoose uses DB connection

*/


//db.js exists to guarantee that the backend never runs without a database connection.