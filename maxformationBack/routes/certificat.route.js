const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth"); // importe le middleware

const {
  getAllCertificats,
  createCertificats,
} = require("../controllers/certificat.controller");

// Récupérer tous les certificats (pas besoin d'auth pour lire)
router.get("/", getAllCertificats);

// Créer un certificat (protégé)
router.post("/", authMiddleware, createCertificats);

module.exports = router;
