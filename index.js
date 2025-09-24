const express = require("express");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongo DB connected");
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Server Started");
});
