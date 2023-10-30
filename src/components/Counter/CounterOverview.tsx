import React, { ChangeEvent, useEffect, useState } from "react";

import classNames from "classnames";
import InputTeam from "../Forms/InputForms/InputTeam";
import InputNumber from "../Forms/InputForms/InputNumber";
import InputCheckbox from "../Forms/InputForms/InputCheckbox";
import { calculatePoints } from "@/utils/calcPoints";
import { Game } from "@/types/game";
import authServices from "@/services/auth.services";
import Toast from "../Toast/Toast";

export const CounterOverview = () => {
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
  const [pointsTeam1, setPointsTeam1] = useState<string | number>("");
  const [pointsTeam2, setPointsTeam2] = useState<string | number>("");
  const [pointsSumTeam1, setPointsSumTeam1] = useState<string | number>(0);
  const [pointsSumTeam2, setPointsSumTeam2] = useState<string | number>(0);
  const [failedTichu1, setfailedTichu1] = useState<boolean>(false);
  const [failedTichu2, setfailedTichu2] = useState<boolean>(false);
  const [failedGrandTichu3, setfailedGrandTichu3] = useState<boolean>(false);
  const [failedGrandTichu4, setfailedGrandTichu4] = useState<boolean>(false);
  const [game, setGame] = useState<Game>();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"error" | "success">("error");

  const showToast = (message: string, type: "error" | "success") => {
    setToastMessage(message);
    setToastType("success");
  };

  const closeToast = () => {
    setToastMessage("");
  };

  useEffect(() => {
    const fetchCurrentUserAndSetGame = async () => {
      if (Number(pointsSumTeam1) >= 1000 || Number(pointsSumTeam2) >= 1000) {
        const user = await authServices.getCurrentUser();
        if (user?.id) {
          setGame({
            team1: team1,
            team2: team2,
            userId: user.id,
            team1result: Number(pointsSumTeam1),
            team2result: Number(pointsSumTeam2),
          });

          if (Number(pointsSumTeam1) > Number(pointsSumTeam2)) {
            showToast("Glückwunsch " + team1, "success");
          } else {
            showToast("Glückwunsch " + team2, "success");
          }
        }
      }
    };

    void fetchCurrentUserAndSetGame();
  }, [pointsSumTeam1, pointsSumTeam2]);

  const [activeDoubleWinToggle, setActiveDoubleWinToggle] =
    useState<ToggleDoublewin | null>(null);

  const [activeToggle, setActiveToggle] = useState<ToggleName | null>(null);

  const handleToggleChange = (name: ToggleName) => {
    setActiveToggle(activeToggle === name ? null : name);
  };

  const handleTeam1Change = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setPointsTeam1("");
      setPointsTeam2("");
      return;
    }

    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= -25 && value <= 125) {
      setPointsTeam1(value);
      setPointsTeam2(100 - value);
    }
  };

  const handleTeam2Change = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setPointsTeam2("");
      setPointsTeam1("");
      return;
    }

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
              value={pointsTeam1.toString()}
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
              value={pointsTeam2.toString()}
              onChange={handleTeam2Change}
              className={classNames("w-fit")}
            />

            <p className={classNames("text-2xl", "my-2")}>{pointsSumTeam2}</p>
          </div>
        </div>
        <div className={classNames("my-4 grid grid-cols-3 gap-4")}>
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
        <div className={classNames("my-4  grid grid-cols-3 gap-4")}>
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
        <div className={classNames("my-4  grid grid-cols-3 gap-4")}>
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
        <div className={classNames("my-4 grid grid-cols-3 gap-4")}>
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
        <div className={classNames("my-4 grid grid-cols-3 gap-4")}>
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
        <div className={classNames("my-4 grid grid-cols-3 gap-4")}>
          <div></div>

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
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CounterOverview;
