import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "align-center",
        "rounded-3xl",
        "bg-zinc-900",
        "text-white",
        "px-4",
        "py-2",
        "cursor-pointer",
        "hover:bg-zinc-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
