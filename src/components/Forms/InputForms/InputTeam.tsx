import classNames from "classnames";
import { ChangeEventHandler, FC } from "react";

interface InputTeamProps {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

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
