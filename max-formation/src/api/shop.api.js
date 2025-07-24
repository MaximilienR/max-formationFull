import { BASE_URL } from "../utils/url";

export async function shop(values) {
  console.log(values);
  console.log(BASE_URL);
  try {
    const response = await fetch(`${BASE_URL}/shop`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    });
    const message = await response.json();
    console.log(message);

    return message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
