import classNames from "classnames";
import type { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  className?: string;
  type?: string;
};

const Input: FC<InputProps> = ({
  placeholder,
  className,
  type = "text",
  ...props
}) => {
  return (
    <input
      {...props}
      className={classNames(
        className,
        "h-[43px]",
        "w-[440px]",
        "p-3",
        "border-zinc-300",
        "rounded",
        "border",
        "outline-none"
      )}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
