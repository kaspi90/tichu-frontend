import { setCookie } from "cookies-next";
import type { User, UserUpdateInput } from "@/types/user";
import { backendUrl } from "./api.services";

type RegisterResponse = {
  token: string;
};

const getUser = async () => {
  try {
    const response = await fetch(backendUrl + "users/1");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const register = async (data: User) => {
  try {
    const response = await fetch(backendUrl + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: RegisterResponse = await response.json();
    setCookie("token", responseData.token);
  } catch (error) {
    console.error(error);
  }
};

const updateUserdata = async (userId: number, data: UserUpdateInput) => {
  try {
    const response = await fetch(backendUrl + `users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedData = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const UserService = {
  register,
  getUser,
  updateUserdata,
};

export default UserService;
