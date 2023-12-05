import classNames from "classnames";
import React from "react";
import { FC } from "react";
import { createGame } from "@/services/game.services";
import type { Game } from "@/types/game";

type ToastProps = {
  message: string;
  type: "error" | "success";
  onClose: () => void;
  game?: Game;
  pointsSumTeam1: string | number;
  setPointsSumTeam1: React.Dispatch<React.SetStateAction<number>>;
  pointsSumTeam2: string | number;
  setPointsSumTeam2: React.Dispatch<React.SetStateAction<number>>;
  onResetToggles: () => void;
};

const Toast: FC<ToastProps> = ({
  message,
  type,
  onClose,
  game,
  setPointsSumTeam1,
  setPointsSumTeam2,
  onResetToggles,
}) => {
  const handleClick = async (game: Game) => {
    try {
      if (game) {
        await createGame(game);
        setPointsSumTeam1(0);
        setPointsSumTeam2(0);
        onResetToggles();
      }
    } catch (error) {
      console.error("Failed to create game:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div
      className={classNames(
        "fixed",
        "left-0",
        "top-0",
        "z-50",
        "flex",
        "h-full",
        "w-full",
        "items-center",
        "justify-center",
        `${message ? "" : "hidden"}`
      )}
    >
      <div
        className={classNames(
          "w-96",
          "space-y-4",
          "rounded-lg",
          "border-l-4",
          "bg-white",
          "p-6",
          "shadow-md",
          `${type === "error" ? "border-red-500" : "border-green-500"}`
        )}
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
              className={classNames(
                "rounded",
                "bg-gray-600",
                "px-4",
                "py-2",
                "text-white"
              )}
            >
              New Game
            </button>
          )}
          <button
            onClick={() => game && void handleClick(game)}
            className={classNames(
              "rounded",
              "bg-gray-600",
              "px-4",
              "py-2",
              "text-white"
            )}
          >
            Save result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
