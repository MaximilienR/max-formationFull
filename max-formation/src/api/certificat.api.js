import { BASE_URL } from "../utils/url";

//Fonction pour  cree

export async function createCertificat(values) {
  try {
    const response = await fetch(`${BASE_URL}/certificat`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur inconnue du serveur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API createCertificat:", error);
    throw error;
  }
}
