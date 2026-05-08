const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function sendForgotPasswordCode(phoneNumber) {
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, "").slice(0, 8);

  const response = await fetch(`${API_URL}/forgot-password/send-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      phone_number: cleanPhoneNumber,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Send code error response:", data);

    if (data.errors) {
      const firstError = Object.values(data.errors)[0][0];
      throw new Error(firstError);
    }

    throw new Error(data.message || "Failed to create verification code.");
  }

  return data;
}

export async function verifyForgotPasswordCode(phoneNumber, code) {
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, "").slice(0, 8);

  const response = await fetch(`${API_URL}/forgot-password/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      phone_number: cleanPhoneNumber,
      code,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Verify code error response:", data);

    if (data.errors) {
      const firstError = Object.values(data.errors)[0][0];
      throw new Error(firstError);
    }

    throw new Error(data.message || "Invalid verification code.");
  }

  return data;
}

export async function resetForgotPassword(phoneNumber, code, password) {
  const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, "").slice(0, 8);

  const response = await fetch(`${API_URL}/forgot-password/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      phone_number: cleanPhoneNumber,
      code,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Reset password error response:", data);

    if (data.errors) {
      const firstError = Object.values(data.errors)[0][0];
      throw new Error(firstError);
    }

    throw new Error(data.message || "Failed to reset password.");
  }

  return data;
}