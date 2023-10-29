// services/gameService.ts
import { Game, GameResult } from "@/types/game";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const API_BASE_URL = backendUrl + "games"; // Assuming your NestJS API is running on this URL

export const createGame = async (game: Game) => {
  return await axios.post(API_BASE_URL, game);
};
export const getAllGames = async (): Promise<GameResult[]> => {
  const response = await axios.get<GameResult[]>(API_BASE_URL);
  return response.data;
};

export const getGameById = async (id: number) => {
  return await axios.get(`${API_BASE_URL}/${id}`);
};

export const getMyGames = async (): Promise<GameResult[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const response = await axios.get<GameResult[]>(
    `${API_BASE_URL}/my-games`,
    config
  );
  console.log(response);
  return response.data;
};
