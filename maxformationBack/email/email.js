const nodemailer = require("nodemailer");

// Création du transporteur
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fonction générique pour envoyer un mail en toute sécurité
const sendMailSafe = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé à :", mailOptions.to);
    console.log("Message ID :", info.messageId);
  } catch (error) {
    console.error("❌ Erreur en envoyant le mail :", error);
  }
};

// Fonction pour envoyer un email de confirmation d'inscription
const sendConfirmationEmail = async (email, token) => {
  const url = `${process.env.FRONT}/verify/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmez votre inscription",
    html: `
      <h2>Bienvenue !</h2>
      <p>Bienvenue sur notre site ! Cliquez sur le lien suivant pour continuer votre inscription : <a href="${process.env.FRONT}/login?token=${token}">Confirmer l'inscription</a></p>
    `,
  };
  await sendMailSafe(mailOptions);
};

// Fonction pour réinitialisation du mot de passe
const sendReset = async (email, token) => {
  const url = `${process.env.FRONT}/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <a href="${url}">Réinitialiser mon mot de passe</a>
    `,
  };
  await sendMailSafe(mailOptions);
};

// Accusé de réception pour un message utilisateur
const sendMessage = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Accusé de réception",
    html: `<p>Votre demande a bien été prise en compte.</p>`,
  };
  await sendMailSafe(mailOptions);
};

// Confirmation d'achat
const sendConfirmAchat = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation de commande",
    html: `<p>Merci pour votre commande !</p>`,
  };
  await sendMailSafe(mailOptions);
};

// Envoyer un message de contact à l'admin
const sendMessageToAdmin = async (userEmail, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADMIN,
    subject: `Nouveau message de contact : ${subject}`,
    html: `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>De :</strong> ${userEmail}</p>
      <p><strong>Sujet :</strong> ${subject}</p>
      <p><strong>Message :</strong><br/>${message}</p>
    `,
  };
  await sendMailSafe(mailOptions);
};

// Fonction pour envoyer un email de test
const sendTestEmail = async () => {
  await sendMailSafe({
    from: process.env.EMAIL_USER,
    to: "destinataire@example.com",
    subject: "Test Nodemailer",
    html: "<p>Test d'envoi d'email.</p>",
  });
};

module.exports = {
  sendMailSafe,
  sendTestEmail,
  sendConfirmationEmail,
  sendReset,
  sendMessage,
  sendConfirmAchat,
  sendMessageToAdmin,
};
