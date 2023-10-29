import { createGame } from "@/services/game.services";
import { Game } from "@/types/game";
import classNames from "classnames";
import React from "react";

type ToastProps = {
  message: string;
  type: "error" | "success";
  onClose: () => void;
  game?: Game;
  pointsSumTeam1: string | number;
  setPointsSumTeam1: React.Dispatch<React.SetStateAction<string | number>>;
  pointsSumTeam2: string | number;
  setPointsSumTeam2: React.Dispatch<React.SetStateAction<string | number>>;
};

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  game,
  setPointsSumTeam1,
  setPointsSumTeam2,
}) => {
  const handleClick = (game: Game) => {
    game && createGame(game);
    setPointsSumTeam1(0);
    setPointsSumTeam2(0);
    onClose();
  };
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center ${
        !message && "hidden"
      }`}
    >
      <div
        className={`w-96 space-y-4 rounded-lg border-l-4 bg-white p-6 shadow-md ${
          type === "error" ? "border-red-500" : "border-green-500"
        }`}
      >
        <p>{message}</p>
        <div className={classNames("flex", "justify-between")}>
          {onClose && (
            <button
              onClick={() => {
                setPointsSumTeam1(0);
                setPointsSumTeam2(0);
                onClose();
              }}
              className="rounded bg-gray-600 px-4 py-2 text-white"
            >
              New Game
            </button>
          )}
          <button
            onClick={() => game && handleClick(game)}
            className="rounded bg-gray-600 px-4 py-2 text-white"
          >
            Save result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
