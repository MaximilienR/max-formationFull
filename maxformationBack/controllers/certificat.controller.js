const Certificat = require("../models/certificat/certificat.model");
const User = require("../models/user/User");

const createCertificats = async (req, res) => {
  try {
    console.log("Requête reçue, données:", req.body);
    console.log("Utilisateur authentifié :", req.user); // <-- Ajouté

    const { name, date } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le champ name est requis." });
    }

    // 🆕 récupérer l'ID utilisateur depuis req.user si tu utilises une authentification
    const userId = req.user.id;
    // ou req.user.id selon ton middleware d'authentification

    const newCertificat = new Certificat({
      name,
      date: date || new Date(),
      user: userId, // ajouter l'utilisateur
    });

    const savedCertificat = await newCertificat.save();

    // 🆕 (optionnel) ajouter ce certificat à la liste de certificats de l'utilisateur
    await User.findByIdAndUpdate(userId, {
      $push: { certificats: savedCertificat._id },
    });

    res.status(201).json(savedCertificat);
  } catch (err) {
    console.error("Erreur lors de la création du certificat :", err);
    res.status(500).json({
      message: "Erreur lors de la création du certificat",
      error: err.message,
    });
  }
};

const getAllCertificats = async (req, res) => {
  try {
    const certificat = await Certificat.find();
    res.json(certificat);
  } catch (error) {
    console.error("Erreur lors de la récupération des certificat :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des cours" });
  }
};

module.exports = {
  getAllCertificats,
  createCertificats,
};
