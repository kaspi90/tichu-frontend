export interface Game {
  team1: string;
  team2: string;
  team1result: number;
  team2result: number;
  userId: number;
}

export type GameResult = {
  id: number;
  team1: string;
  team2: string;
  team1result: number;
  team2result: number;
};
