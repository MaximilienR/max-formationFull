import { BASE_URL } from "../utils/url";

export async function signup(values) {
  console.log(values);
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login(values) {
  console.log(" voila les valeur " + values);

  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login échoué");
    }

    console.log("Login réussi :", data);

    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error("Erreur de login :", error.message);
  }
}

export async function updateUser(updatedData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
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
  });

  const responseData = await response.json();
  return { ok: response.ok, data: responseData };
}

export async function deleteAccount() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    console.error("Erreur suppression :", error.message);
    throw error;
  }
}
