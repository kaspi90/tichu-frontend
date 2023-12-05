import classNames from "classnames";
import { useState, useEffect, FC } from "react";
import { getMyGames } from "@/services/game.services";
import type { GameResult } from "@/types/game";

const HistoryOverview: FC = () => {
  const [allGames, setAllGames] = useState<GameResult[] | null>(null);

  useEffect(() => {
    const fetchAllGames = async () => {
      const games = await getMyGames();
      setAllGames(games);
    };

    void fetchAllGames();
  }, []);

  return (
    <div
      className={classNames(
        "bg-white",
        "h-fit",
        "w-[90%]",
        "rounded-xl",
        "mx-auto"
      )}
    >
      <div className={classNames("p-4")}>
        <div
          className={classNames(
            "border",
            "mx-auto",
            "rounded-xl",
            "h-full",
            "pb-6"
          )}
        >
          <h2
            className={classNames("font-bold", "text-rose-950", "mb-5", "p-4")}
          >
            History
          </h2>
          <div className={classNames("grid grid-cols-3 gap-4", "p-4")}>
            <div className={classNames("text-center", "font-bold")}>Team 1</div>
            <div className={classNames("text-center", "font-bold")}></div>
            <div className={classNames("text-center", "font-bold")}>Team 2</div>
          </div>
          {allGames &&
            allGames.map((game, index) => (
              <div
                key={game.id}
                className={classNames(
                  "grid grid-cols-3 gap-4",
                  index % 2 === 0 ? "bg-neutral-300" : "bg-neutral-100",
                  "p-4"
                )}
              >
                <div
                  className={classNames(
                    "flex",
                    "gap-4",
                    "justify-center",
                    "md:flex-row",
                    "flex-col"
                  )}
                >
                  <p className={classNames("font-bold")}>{game.team1}</p>
                  <p
                    className={classNames(
                      "border",
                      "bg-green-700",
                      "text-white",
                      "md:w-30",
                      "w-fit",
                      "px-2",
                      "md:px-0",
                      "rounded-xl",
                      "text-center",
                      game.team2result > game.team1result
                        ? "bg-red-700"
                        : "bg-green-700"
                    )}
                  >
                    {game.team2result > game.team1result ? "Lost" : "Won"}
                  </p>
                  <p className={classNames("font-bold")}>{game.team1result}</p>{" "}
                </div>
                <div />
                <div
                  className={classNames(
                    "flex",
                    "gap-4",
                    "justify-center",
                    "md:flex-row",
                    "flex-col"
                  )}
                >
                  <p className={classNames("font-bold")}>{game.team2}</p>
                  <p
                    className={classNames(
                      "border",
                      "text-white",
                      "md:w-30",
                      "w-fit",
                      "px-2",
                      "md:px-0",
                      "rounded-xl",
                      "text-center",
                      game.team1result > game.team2result
                        ? "bg-red-700"
                        : "bg-green-700"
                    )}
                  >
                    {game.team1result > game.team2result ? "Lost" : "Won"}
                  </p>
                  <p className={classNames("font-bold")}>{game.team2result}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryOverview;
