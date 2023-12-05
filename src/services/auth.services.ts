import { setCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import type { LoginResponse, User } from "@/types/user";
import { backendUrl } from "./api.services";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const url = `${backendUrl}auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: LoginResponse = await response.json();

  if (data.token) {
    setCookie("key", data.token);
  } else {
    console.error("Token not found in response");
  }

  return data;
};

export const logout = (): void => {
  deleteCookie("token");
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = getCookie("token");

  if (!token) {
    return null;
  }

  const url = `${backendUrl}users/me`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Error fetching user data", response.statusText);
    return null;
  }

  const data: User = await response.json();
  return data;
};
