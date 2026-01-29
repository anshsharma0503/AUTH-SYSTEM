const express = require("express"); // Imports Express to create the app.

const app = express(); // This creates the main Express application.
app.use(express.json()); // This allows your server to read JSON bodies.
// w/o this : req.body would be undefined , /auth/register would fail , /auth/login would fail

app.use("/auth", require("./routes/auth"));
// this means any request starting with /auth is handled by /routes/auth.js  e.g -> /auth/register , /auth/login


app.use("/profile", require("./routes/profile")); // /profile → routes/profile.js

app.use("/admin", require("./routes/admin"));


module.exports = app; // This allows server.js to start the app.


// app.js connects routes to the Express app and prepares it to handle requests.