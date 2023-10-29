import axios, { AxiosResponse } from "axios";
import { LoginResponse, User } from "@/types/user";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      backendUrl + "auth/login",
      { email, password }
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    } else {
      console.error("Token not found in response");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // propagate the error so that the calling function is aware of the failure
  }
};

const logout = (): void => {
  localStorage.removeItem("token");
};

const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const response: AxiosResponse<User> = await axios.get(
      backendUrl + "users/me", // Assuming "/users/me" endpoint returns data of the authenticated user.
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
