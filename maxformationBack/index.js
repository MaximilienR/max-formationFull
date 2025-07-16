const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

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

// Servir les fichiers statiques de la SPA (dossier dist)
app.use(express.static(path.join(__dirname, "dist")));

// Route fallback vers index.html pour le rechargement sans erreur 404
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.error(e));

app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
});
