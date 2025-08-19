require("dotenv").config(); // pour charger ton .env
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_ADMIN, // tu peux mettre ton mail perso pour tester
  subject: "Test Nodemailer",
  html: `<p>✅ Ceci est un test d'envoi de mail depuis Node.js avec Gmail !</p>`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Erreur lors de l'envoi :", error);
  } else {
    console.log("✅ Email envoyé ! Message ID :", info.messageId);
  }
});