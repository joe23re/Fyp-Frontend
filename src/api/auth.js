import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function register(username, email, phoneNumber, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      phone_number: phoneNumber,
      password,
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
 await SecureStore.setItemAsync(
  "auth_user",
  JSON.stringify({
    ...data.user,
    plain_password: password,
  })
);

  return data;
}

export async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
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

  await SecureStore.setItemAsync(
    "auth_user",
    JSON.stringify({
      ...data.user,
      plain_password: password,
    })
  );

  return data;
}



export async function updateProfile(username, phoneNumber, password) {
  const token = await SecureStore.getItemAsync("auth_token");

  const bodyData = {
    username,
    phone_number: phoneNumber,
  };

  if (password) {
    bodyData.password = password;
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Update profile error:", data);

    if (data.errors) {
      const firstError = Object.values(data.errors)[0][0];
      throw new Error(firstError);
    }

    throw new Error(data.message || "Failed to update profile");
  }

  await SecureStore.setItemAsync(
    "auth_user",
    JSON.stringify({
      ...data.user,
      plain_password: password || "",
    })
  );

  return data;
}



export async function getAuthUser() {
  const userJson = await SecureStore.getItemAsync("auth_user");

  if (!userJson) {
    return null;
  }

  return JSON.parse(userJson);
}

export async function getAuthToken() {
  return await SecureStore.getItemAsync("auth_token");
}

export async function logout() {
  await SecureStore.deleteItemAsync("auth_token");
  await SecureStore.deleteItemAsync("auth_user");
}
