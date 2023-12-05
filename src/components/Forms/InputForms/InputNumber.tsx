import classNames from "classnames";
import type { ChangeEventHandler, FC } from "react";

type InputNumberProps = {
  value?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const InputNumber: FC<InputNumberProps> = ({ value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      step="5"
      className={classNames(
        "text-center",
        "rounded-xl",
        "p-2",
        "placeholder:text-black",
        "placeholder:font-bold",
        "my-2"
      )}
    />
  );
};

export default InputNumber;
