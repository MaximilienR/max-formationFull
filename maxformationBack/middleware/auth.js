const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  console.log("Cookies reçus par le serveur :", req.cookies);

  try {
    // Récupérer le token depuis le cookie
    const token = req.cookies.token; // <-- changement ici

    if (!token) {
      return res.status(401).json({ msg: "Non autorisé : token manquant" });
    }

    console.log("Token reçu :", token);
    console.log("SECRET_KEY :", SECRET);

    const decoded = jwt.verify(token, SECRET);
    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    console.error("Erreur dans authMiddleware:", error);
    return res.status(401).json({ msg: "Token invalide ou expiré" });
  }
};

module.exports = { authMiddleware };
