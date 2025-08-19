import { BASE_URL } from "../utils/url";

export async function signup(values) {
  const response = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return { ok: response.ok, data };
}

export async function login(values) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    // On renvoie une erreur avec le message pour la gestion côté UI
    throw new Error(data.message || "Login échoué");
  }

  // Retourne les données utiles (ex: user)
  return data;
}

export async function updateUser(updatedData) {
  const response = await fetch(`${BASE_URL}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    credentials: "include",
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
    credentials: "include",
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
    credentials: "include",
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
      },
      credentials: "include",
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Erreur suppression :", error.message);
    throw error;
  }
}