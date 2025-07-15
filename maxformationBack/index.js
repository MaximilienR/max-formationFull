const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const allowedOrigin = process.env.FRONT;
const route = require("./routes");

const app = express();

app.use(express.static(path.join(__dirname, "/maxformation/dist")));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(route);

mongoose
  .connect(process.env.MONGO_URI) // Assure-toi que la variable est bien nommée MONGO_URI
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.error("MongoDB connection error:", e));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/maxformation/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
