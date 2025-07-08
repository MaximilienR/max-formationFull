const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigin = process.env.FRONT;
const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());

// Configuration CORS
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Tes routes API
const routes = require("./routes");
app.use(routes);

// En production, sert les fichiers statiques du build React
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../max-formation/dist")));

  // Toute route non gérée par l'API renvoie index.html (React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../max-formation/dist/index.html"));
  });
}

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
