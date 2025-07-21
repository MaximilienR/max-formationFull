import { BASE_URL } from "../utils/url";

//Fonction pour  cree
// certificat.api.js
export async function createCertificat(data, token) {
  try {
    const response = await fetch("http://localhost:3000/certificat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- ici on met le token dans le header
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur inconnue");
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur API createCertificat:", err);
    throw err;
  }
}
