import { BASE_URL } from "../utils/url";

export async function createCours(values) {
  try {
    const response = await fetch(`${BASE_URL}/cours`, {
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
    console.error("Erreur API createCours:", error);
    throw error;
  }
}

export async function getCours() {
  const response = await fetch(`${BASE_URL}/cours`);
  if (!response.ok) throw new Error("Erreur lors du chargement des cours");
  const data = await response.json();
  console.log("Cours reçus :", data);
  return data;
}

export async function deleteCours(id) {
  try {
    const response = await fetch(`${BASE_URL}/cours/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la suppression");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API deleteCours:", error);
    throw error;
  }
}

export async function updateCours(id, body) {
  const response = await fetch(`${BASE_URL}/cours/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Erreur lors de la mise à jour");
  }

  return await response.json();
}

export async function getCoursById(id) {
  const response = await fetch(`${BASE_URL}/cours/${id}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du cours.");
  }

  const data = await response.json();
  console.log("getCoursById data:", data); // 👈 AJOUTE CECI

  return data;
}

export async function createQuiz(values) {
  try {
    const response = await fetch(`${BASE_URL}/quizz`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur inconnue du serveur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API createQuiz:", error);
    throw error;
  }
}

export async function getQuizzByCoursId(coursId) {
  const response = await fetch(`${BASE_URL}/cours/quizz/cours/${coursId}`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du quiz.");
  }

  const data = await response.json();
  return data;
}

