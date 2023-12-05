import { getCookie } from "cookies-next";
import { backendUrl } from "./api.services";

type UploadResponse = {
  success: boolean;
  message: string;
  image: string;
};

const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const token = getCookie("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const response = await fetch(`${backendUrl}upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteFile = async (userId: number): Promise<UploadResponse> => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const response = await fetch(`${backendUrl}upload/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UploadResponse = await response.json();
    return data;
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
