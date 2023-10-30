import { User, UserUpdateInput } from "@/types/user";
import axios from "axios";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/"; // Default URL

interface RegisterResponse {
  token: string;
  // other properties...
}

const getUser = () => {
  axios
    .get(backendUrl + "users/1") // replace '1' with the id of the user you want to fetch
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const register = (data: User) => {
  axios
    .post<RegisterResponse>(backendUrl + "users", data)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateUserdata = (userId: number, data: UserUpdateInput) => {
  axios
    .put(backendUrl + `users/${userId}`, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
const UserService = {
  register,
  getUser,
  updateUserdata,
};

export default UserService;
