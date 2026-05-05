import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function register(username, email, phoneNumber, password) {
  console.log("Sending signup data:", {
    username,
    email,
    phone_number: phoneNumber,
    password,
  });

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      phone_number: phoneNumber,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Register error response:", data);

    if (data.errors) {
      const firstError = Object.values(data.errors)[0][0];
      throw new Error(firstError);
    }

    throw new Error(data.message || "Registration failed");
  }

  await SecureStore.setItemAsync("auth_token", data.token);

  return data;
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.errors) {
      const firstError = Object.values(data.errors)[0][0];
      throw new Error(firstError);
    }

    throw new Error(data.message || "Login failed");
  }

  await SecureStore.setItemAsync("auth_token", data.token);

  return data;
}