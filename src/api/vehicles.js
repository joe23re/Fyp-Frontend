import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function getToken() {
  const token = await SecureStore.getItemAsync("auth_token");

  if (!token) {
    throw new Error("You are not signed in. Please sign in again.");
  }

  return token;
}

export async function getVehicles() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/vehicles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Get vehicles error:", data);

    if (response.status === 401) {
      throw new Error("Unauthenticated. Please sign in again.");
    }

    throw new Error(data.message || "Failed to load vehicles.");
  }

  return data.vehicles;
}

export async function addVehicle(vehicleData) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vehicleData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Add vehicle error:", data);

    if (response.status === 401) {
      throw new Error("Unauthenticated. Please sign in again.");
    }

    if (data.errors) {
      const firstError = Object.values(data.errors)[0][0];
      throw new Error(firstError);
    }

    throw new Error(data.message || "Failed to add vehicle.");
  }

  return data;
}

export async function deleteVehicle(vehicleId) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Delete vehicle error:", data);

    if (response.status === 401) {
      throw new Error("Unauthenticated. Please sign in again.");
    }

    throw new Error(data.message || "Failed to delete vehicle.");
  }

  return data;
}

export async function saveSelectedVehicle(vehicle) {
  await SecureStore.setItemAsync("selected_vehicle", JSON.stringify(vehicle));
}

export async function getSelectedVehicle() {
  const vehicleJson = await SecureStore.getItemAsync("selected_vehicle");

  if (!vehicleJson) {
    return null;
  }

  return JSON.parse(vehicleJson);
}

export async function removeSelectedVehicle() {
  await SecureStore.deleteItemAsync("selected_vehicle");
}