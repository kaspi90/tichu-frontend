import { User, UserUpdateInput } from "@/types/user";
import api from "./api.services";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// const userData = async (id: number): Promise<User> => {
//     const { data: res } = await api.get<User>("/user/" + JSON.stringify(id), {
//       headers: {
//         Authorization: `Bearer ${userToken}`,
//       },
//     });

//     return res;
//   };

// function getTokens() {
//     throw new Error("Function not implemented.");
// }

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
    .post(backendUrl + "users", data)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateUserdata = (userId: any, data: UserUpdateInput) => {
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
