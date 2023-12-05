import { getCookie } from "cookies-next";
import type { Game, GameResult } from "@/types/game";
import { backendUrl } from "./api.services";

const API_BASE_URL = backendUrl + "games";

export const createGame = async (game: Game): Promise<GameResult> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<GameResult>;
};

export const getAllGames = async (): Promise<GameResult[]> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<GameResult[]>;
};

export const getGameById = async (id: number): Promise<GameResult> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<GameResult>;
};

export const getMyGames = async (): Promise<GameResult[]> => {
  const token = getCookie("token");

  const response = await fetch(`${API_BASE_URL}/my-games`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : "default-token"}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch my games:", response.status);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as GameResult[];
  return data;
};
