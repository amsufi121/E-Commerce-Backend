const express = require("express");

var cors = require("cors");
const app = express();

app.use(cors());
const authRoute = require("./routes/auth.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());

app.use("/api/auth", authRoute); //predefined the route / initializing the route

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongo DB connected");
});

app.listen(5000, () => {
  console.log("Server Started");
});
