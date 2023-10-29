import classNames from "classnames";
import { ChangeEventHandler, FC, InputHTMLAttributes } from "react";

interface InputCheckboxProps {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
}

const InputCheckbox: FC<InputCheckboxProps> = ({
  value,
  onChange,
  checked,
  disabled,
}) => {
  return (
    <div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          className="peer sr-only"
          name="successful-tichu-1"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
      </label>
    </div>
  );
};

export default InputCheckbox;
