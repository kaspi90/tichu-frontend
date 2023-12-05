import classNames from "classnames";
import type { FC, ChangeEventHandler } from "react";

type InputCheckboxProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  disabled?: boolean;
};

const InputSwitch: FC<InputCheckboxProps> = ({
  onChange,
  checked,
  disabled,
}) => {
  return (
    <div>
      <label
        className={classNames(
          "relative",
          "inline-flex",
          "cursor-pointer",
          "items-center"
        )}
      >
        <input
          type="checkbox"
          value=""
          className={classNames("peer", "sr-only")}
          name="successful-tichu-1"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={classNames(
            "peer",
            "h-6",
            "w-11",
            "rounded-full",
            "bg-gray-200",
            "after:absolute",
            "after:left-[2px]",
            "after:top-[2px]",
            "after:h-5",
            "after:w-5",
            "after:rounded-full",
            "after:border",
            "after:border-gray-300",
            "after:bg-white",
            "after:transition-all",
            "after:content-['']",
            "peer-checked:bg-red-800",
            "peer-checked:after:translate-x-full",
            "peer-checked:after:border-white",
            "peer-focus:outline-none",
            "peer-focus:ring-4",
            "peer-focus:ring-white",
            "dark:border-gray-600",
            "dark:bg-gray-700",
            "dark:peer-focus:ring-red-800"
          )}
        />
      </label>
    </div>
  );
};

export default InputSwitch;
