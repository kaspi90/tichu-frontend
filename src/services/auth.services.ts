import axios, { AxiosResponse } from "axios";
import { LoginResponse, User } from "@/types/user";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/";

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const url = `${String(backendUrl)}auth/login`; // Convert backendUrl to string to satisfy TypeScript
    const response: AxiosResponse<LoginResponse> = await axios.post(url, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    } else {
      console.error("Token not found in response");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const logout = (): Promise<boolean> => {
  try {
    localStorage.removeItem("token");
    return Promise.resolve(true);
  } catch (error) {
    console.error("Logout failed:", error);
    return Promise.resolve(false);
  }
};

const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const url = `${String(backendUrl)}users/me`; // Convert backendUrl to string to satisfy TypeScript
    const response: AxiosResponse<User> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error fetching user data", err);
    return null;
  }
};

export default {
  login,
  logout,
  getCurrentUser,
};
