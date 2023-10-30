import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ""; // Default to an empty string if undefined

type UploadResponse = {
  success: boolean;
  message: string;
  image: string; // or whatever type it should be
  // ... other properties
};

const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post<UploadResponse>(
      `${backendUrl}upload`,
      formData,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteFile = async (userId: number): Promise<UploadResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete<UploadResponse>(
      `${backendUrl}upload/${userId}`,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const uploadService = {
  uploadFile,
  deleteFile,
};

export default uploadService;
