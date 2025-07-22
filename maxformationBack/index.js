const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const allowedOrigin = process.env.FRONT;
const app = express();

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

const route = require("./routes");
app.use(route);

mongoose
  .connect(process.env.MOGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../max-formation/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../max-formation/dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
