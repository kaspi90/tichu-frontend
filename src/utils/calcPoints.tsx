type InputCalculateProps = {
  pointsTeam1: number;
  setPointsTeam1: (value: number) => void;
  pointsSumTeam1: number;
  pointsSumTeam2: number;
  pointsTeam2: number;
  setPointsTeam2: (value: number) => void;
  setPointsSumTeam1: (value: number) => void;
  setPointsSumTeam2: (value: number) => void;
  className?: string;
  activeToggle?: ToggleName | null;
  activeDoubleWinToggle?: ToggleDoublewin | null;
  failedTichu1: boolean;
  failedTichu2: boolean;
  failedGrandTichu3: boolean;
  failedGrandTichu4: boolean;
};

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

export const calculatePoints = ({
  pointsTeam1,
  pointsTeam2,
  activeToggle,
  activeDoubleWinToggle,
  failedTichu1,
  failedTichu2,
  failedGrandTichu3,
  failedGrandTichu4,
  setPointsSumTeam1,
  setPointsSumTeam2,
  setPointsTeam1,
  setPointsTeam2,
  pointsSumTeam1,
  pointsSumTeam2,
}: InputCalculateProps): void => {
  let team1Points = pointsTeam1;
  let team2Points = pointsTeam2;

  switch (activeToggle) {
    case "successful-tichu-1":
      team1Points += 100;
      break;
    case "successful-tichu-2":
      team2Points += 100;
      break;
    case "successful-grand-tichu-1":
      team1Points += 200;
      break;
    case "successful-grand-tichu-2":
      team2Points += 200;
      break;
  }

  switch (activeDoubleWinToggle) {
    case "double-win-1":
      team1Points += 200;
      break;
    case "double-win-2":
      team2Points += 200;
      break;
  }

  if (failedTichu1) {
    team1Points -= 100;
  }

  if (failedTichu2) {
    team2Points -= 100;
  }

  if (failedGrandTichu3) {
    team1Points -= 200;
  }

  if (failedGrandTichu4) {
    team2Points -= 200;
  }

  setPointsSumTeam1(pointsSumTeam1 + team1Points);
  setPointsSumTeam2(pointsSumTeam2 + team2Points);
  setPointsTeam1(0);
  setPointsTeam2(0);
};
