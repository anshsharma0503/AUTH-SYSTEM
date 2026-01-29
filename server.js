require("dotenv").config(); // load environment variables ||  this loads MONGO_URI , JWT_SECRET , PORT  || w/o this : DB connection failed , JWT verification would fail
const app = require("./app"); //this pulls in express app  , routes , middleware setup
const connectDB = require("./config/db"); // import DB connector

connectDB(); // this ensures:DB is ready , auth can actually store and fetch users

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); // start server
//server.js loads secrets, connects the database, and starts the server.

/**
 * Server starts
   ↓
.env loaded
   ↓
DB connected
   ↓
Express app created
   ↓
Routes registered
   ↓
Client sends request
   ↓
If /auth → auth routes
If /profile → middleware → route
   ↓
Response sent

 */