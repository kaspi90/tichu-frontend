import classNames from "classnames";
import React, { useEffect, useState } from "react";
import type { ChangeEvent, FC } from "react";
import InputTeam from "../Forms/InputForms/InputTeam";
import InputNumber from "../Forms/InputForms/InputNumber";
import InputCheckbox from "../Forms/InputForms/InputSwitch";
import { calculatePoints } from "@/utils/calcPoints";
import type { Game } from "@/types/game";
import { getCurrentUser } from "@/services/auth.services";
import Toast from "../Toast/Toast";
const CounterOverview: FC = () => {
  type ToggleName =
    | "successful-tichu-1"
    | "successful-tichu-2"
    | "successful-grand-tichu-1"
    | "successful-grand-tichu-2"
    | "failed-tichu-1"
    | "failed-tichu-2"
    | "failed-grand-tichu-1"
    | "failed-grand-tichu-2";

  type ToggleDoublewin = "double-win-1" | "double-win-2";

  const [team1, setTeam1] = useState<string>("Team 1");
  const [team2, setTeam2] = useState<string>("Team 2");
  const [pointsTeam1, setPointsTeam1] = useState<number>(0);
  const [pointsTeam2, setPointsTeam2] = useState<number>(0);
  const [pointsSumTeam1, setPointsSumTeam1] = useState<number>(0);
  const [pointsSumTeam2, setPointsSumTeam2] = useState<number>(0);
  const [failedTichu1, setfailedTichu1] = useState<boolean>(false);
  const [failedTichu2, setfailedTichu2] = useState<boolean>(false);
  const [failedGrandTichu3, setfailedGrandTichu3] = useState<boolean>(false);
  const [failedGrandTichu4, setfailedGrandTichu4] = useState<boolean>(false);
  const [game, setGame] = useState<Game>();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"error" | "success">("error");
  const [activeDoubleWinToggle, setActiveDoubleWinToggle] =
    useState<ToggleDoublewin | null>(null);
  const [activeToggle, setActiveToggle] = useState<ToggleName | null>(null);

  const showToast = (message: string, type: "error" | "success") => {
    setToastMessage(message);
    setToastType(type);
  };

  const closeToast = () => {
    setToastMessage("");
  };

  const resetToggles = () => {
    setActiveToggle(null);
    setActiveDoubleWinToggle(null);
    setfailedTichu1(false);
    setfailedTichu2(false);
    setfailedGrandTichu3(false);
    setfailedGrandTichu4(false);
  };

  useEffect(() => {
    const fetchCurrentUserAndSetGame = async () => {
      if (pointsSumTeam1 >= 1000 || pointsSumTeam2 >= 1000) {
        const user = await getCurrentUser();
        if (user?.id) {
          setGame({
            team1: team1,
            team2: team2,
            userId: user.id,
            team1result: pointsSumTeam1,
            team2result: pointsSumTeam2,
          });

          if (pointsSumTeam1 > pointsSumTeam2) {
            showToast("Congratulations " + team1, "success");
          } else {
            showToast("Congratulations " + team2, "success");
          }
        }
      }
    };

    void fetchCurrentUserAndSetGame();
  }, [pointsSumTeam1, pointsSumTeam2, team1, team2]);

  const handleToggleChange = (name: ToggleName) => {
    setActiveToggle(activeToggle === name ? null : name);
  };

  const handleTeam1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= -25 && value <= 125) {
      setPointsTeam1(value);
      setPointsTeam2(100 - value);
    }
  };

  const handleTeam2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= -25 && value <= 125) {
      setPointsTeam2(value);
      setPointsTeam1(100 - value);
    }
  };

  const handleDoubleWinToggleChange = (name: ToggleDoublewin) => {
    setActiveDoubleWinToggle(activeDoubleWinToggle === name ? null : name);
  };

  return (
    <div
      className={classNames(
        "bg-white",
        "h-[90%]",
        "w-[90%]",
        "rounded-xl",
        "h-fit"
      )}
    >
      <Toast
        message={toastMessage}
        game={game}
        type={toastType}
        onClose={closeToast}
        pointsSumTeam1={pointsSumTeam1}
        pointsSumTeam2={pointsSumTeam2}
        setPointsSumTeam1={setPointsSumTeam1}
        setPointsSumTeam2={setPointsSumTeam2}
        onResetToggles={resetToggles}
      />
      <div
        className={classNames(
          "backdrop-blur-sm",
          "bg-red-900/10",
          "border-white",
          "border-8",
          "h-full",
          "mx-auto",
          "rounded-xl",
          "text-center"
        )}
      >
        <h2 className={classNames("font-bold", "text-xl", "m-4")}>
          Tichu - 1000 Points
        </h2>
        <div className={classNames("flex", "justify-center")}>
          <p
            className={classNames(
              "w-fit",
              "rounded-xl",
              "px-3",
              "py-2",
              "text-white",
              "m-4",
              "bg-rose-950"
            )}
          >
            Round 1
          </p>
        </div>
        <div
          className={classNames(
            "md:grid",
            "md:gap-4",
            "md:grid-cols-3",
            "flex",
            "flex-col"
          )}
        >
          <div
            className={classNames("w-full", "flex", "flex-col", "items-center")}
          >
            <InputTeam
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              className={classNames("w-fit")}
            />
            <InputNumber
              value={pointsTeam1}
              onChange={handleTeam1Change}
              className={classNames("w-fit")}
            />
            <p className={classNames("text-2xl", "my-2")}>{pointsSumTeam1}</p>
          </div>
          <div>
            <h2 className={classNames("text-xl", "my-4", "md:my-0")}> VS </h2>
          </div>
          <div
            className={classNames("w-full", "flex", "flex-col", "items-center")}
          >
            <InputTeam
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              className={classNames("w-fit")}
            />
            <InputNumber
              value={pointsTeam2}
              onChange={handleTeam2Change}
              className={classNames("w-fit")}
            />
            <p className={classNames("text-2xl", "my-2")}>{pointsSumTeam2}</p>
          </div>
        </div>
        <div className={classNames("my-4", "grid", "grid-cols-3", "gap-4")}>
          <InputCheckbox
            checked={activeToggle === "successful-tichu-1"}
            onChange={() => handleToggleChange("successful-tichu-1")}
            disabled={
              activeToggle !== null && activeToggle !== "successful-tichu-1"
            }
          />
          <div>
            <p className={classNames("text-lg", "font-bold")}>
              Successful Tichu
            </p>
          </div>
          <InputCheckbox
            checked={activeToggle === "successful-tichu-2"}
            onChange={() => handleToggleChange("successful-tichu-2")}
            disabled={
              activeToggle !== null && activeToggle !== "successful-tichu-2"
            }
          />
        </div>
        <div className={classNames("my-4", "grid", "grid-cols-3", "gap-4")}>
          <InputCheckbox
            checked={failedTichu1}
            onChange={() => setfailedTichu1(!failedTichu1)}
          />
          <div>
            <p className={classNames("text-lg", "font-bold")}>Failed Tichu</p>
          </div>
          <InputCheckbox
            checked={failedTichu2}
            onChange={() => setfailedTichu2(!failedTichu2)}
          />
        </div>
        <div className={classNames("my-4", "grid", "grid-cols-3", "gap-4")}>
          <InputCheckbox
            checked={activeToggle === "successful-grand-tichu-1"}
            onChange={() => handleToggleChange("successful-grand-tichu-1")}
            disabled={
              activeToggle !== null &&
              activeToggle !== "successful-grand-tichu-1"
            }
          />
          <div>
            <p className={classNames("text-lg", "font-bold")}>
              Successful Grand Tichu
            </p>
          </div>
          <InputCheckbox
            checked={activeToggle === "successful-grand-tichu-2"}
            onChange={() => handleToggleChange("successful-grand-tichu-2")}
            disabled={
              activeToggle !== null &&
              activeToggle !== "successful-grand-tichu-2"
            }
          />
        </div>
        <div className={classNames("my-4", "grid", "grid-cols-3", "gap-4")}>
          <InputCheckbox
            checked={failedGrandTichu3}
            onChange={() => setfailedGrandTichu3(!failedGrandTichu3)}
          />
          <div>
            <p className={classNames("text-lg", "font-bold")}>
              Failed Grand Tichu
            </p>
          </div>
          <InputCheckbox
            checked={failedGrandTichu4}
            onChange={() => setfailedGrandTichu4(!failedGrandTichu4)}
          />
        </div>
        <div className={classNames("my-4", "grid", "grid-cols-3", "gap-4")}>
          <InputCheckbox
            onChange={() => handleDoubleWinToggleChange("double-win-1")}
            disabled={
              activeDoubleWinToggle !== null &&
              activeDoubleWinToggle !== "double-win-1"
            }
          />
          <div>
            <p className={classNames("text-lg", "font-bold")}>Double Win</p>
          </div>
          <InputCheckbox
            onChange={() => handleDoubleWinToggleChange("double-win-2")}
            disabled={
              activeDoubleWinToggle !== null &&
              activeDoubleWinToggle !== "double-win-2"
            }
          />
        </div>
        <div className={classNames("my-4", "grid", "grid-cols-3", "gap-4")}>
          <div />
          <div>
            <button
              onClick={() =>
                calculatePoints({
                  pointsTeam1,
                  setPointsTeam1,
                  pointsTeam2,
                  setPointsTeam2,
                  pointsSumTeam1,
                  setPointsSumTeam1,
                  pointsSumTeam2,
                  setPointsSumTeam2,
                  failedTichu1,
                  failedTichu2,
                  failedGrandTichu3,
                  failedGrandTichu4,
                  activeToggle,
                  activeDoubleWinToggle,
                })
              }
              className={classNames(
                "bg-rose-950",
                "text-white",
                "px-2",
                "rounded-xl",
                "py-2",
                "hover:bg-rose-900"
              )}
            >
              Calculate
            </button>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default CounterOverview;
