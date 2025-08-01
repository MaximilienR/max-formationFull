import { BASE_URL } from "../utils/url";

// ✅ Mise à jour de la progression sans token explicite
export async function updateProgression(payload) {
  const response = await fetch(`${BASE_URL}/progression`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include", // ✅ pour envoyer le cookie JWT
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erreur mise à jour progression");
  }

  return response.json();
}

// ✅ Récupération des progressions sans token en argument
export async function getUserProgressions() {
  const response = await fetch(`${BASE_URL}/progression`, {
    method: "GET",
    credentials: "include", // ✅ essentiel
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des progressions");
  }

  return response.json();
}
