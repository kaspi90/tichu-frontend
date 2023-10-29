import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const uploadFile = (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("image", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios
    .post(backendUrl + `upload`, formData, config)
    .then((response) => {
      console.log(response.data);
      return response.data; // return the data so it can be handled outside
    })
    .catch((error) => {
      console.error(error);
      throw error; // re-throw the error so it can be caught outside
    });
};

const deleteFile = (userId: number): Promise<any> => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios
    .delete(backendUrl + `upload/${userId}`, config)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const uploadService = {
  uploadFile,
  deleteFile,
};

export default uploadService;
