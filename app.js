const express = require("express");

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));

module.exports = app;
