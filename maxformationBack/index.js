const path = require("path");
const __DIRNAME = path.resolve();
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigin = process.env.FRONT;
const app = express();
app.use(express.static(path.join(__dirname, "/max-formation/dist")));
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

const routes = require("./routes");
app.use(routes);

// Serve build **only in production**
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__DIRNAME, "/max-formation/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__DIRNAME, "/max-formation/dist/index.html"));
  });
}

mongoose
  .connect(process.env.MOGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
