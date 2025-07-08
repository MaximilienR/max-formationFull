import { BASE_URL } from "../utils/url";

export async function updateProgression(payload) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/progression`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text(); // <-- pour debugger
    throw new Error(errorText || "Erreur mise à jour progression");
  }

  return response.json();
}


export async function getUserProgressions(token) {
  const response = await fetch(`${BASE_URL}/progression`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des progressions");
  }
  return response.json();
}
