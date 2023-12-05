import classNames from "classnames";
import type { ChangeEventHandler, FC } from "react";

type InputTeamProps = {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const InputTeam: FC<InputTeamProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      aria-label="Field name"
      value={value}
      onChange={onChange}
      className={classNames(
        "text-center",
        "rounded-xl",
        "p-2",
        "placeholder:text-black",
        "placeholder:font-bold",
        className
      )}
    />
  );
};

export default InputTeam;
