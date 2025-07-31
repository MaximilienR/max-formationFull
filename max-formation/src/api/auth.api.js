import { BASE_URL } from "../utils/url";

export async function signup(values) {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // <-- Permet d'envoyer le cookie
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login(values) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include", // <-- Permet d'envoyer le cookie
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login échoué");
    }

    console.log("Login réussi :", data);
    // Plus besoin de localStorage.setItem ici car token est dans cookie HTTP-only
  } catch (error) {
    console.error("Erreur de login :", error.message);
  }
}

export async function updateUser(updatedData) {
  const response = await fetch(`${BASE_URL}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Suppression de Authorization, on utilise cookie
    },
    body: JSON.stringify(updatedData),
    credentials: "include", // <-- Important pour envoyer cookie
  });

  const data = await response.json();
  return { ok: response.ok, data };
}

export async function reset(data) {
  const response = await fetch(`${BASE_URL}/user/resetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // <-- Si ton backend attend le cookie
  });

  const responseData = await response.json();
  return { ok: response.ok, data: responseData };
}

export async function forgot(data) {
  const response = await fetch(`${BASE_URL}/user/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // <-- Si besoin
  });

  const responseData = await response.json();
  return { ok: response.ok, data: responseData };
}

export async function deleteAccount() {
  try {
    const response = await fetch(`${BASE_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Plus besoin d'Authorization, cookie géré automatiquement
      },
      credentials: "include", // <-- Important pour cookie
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Erreur suppression :", error.message);
    throw error;
  }
}
