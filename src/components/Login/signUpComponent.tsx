import classNames from "classnames";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import Image from "next/image";
import Input from "../Forms/InputForms/InputText";
import Button from "../Buttons/button";
import UserService from "@/services/user.services";
import type { User } from "@/types/user";
import { Step } from "@/pages/login";

type SignUpProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

const SignUpComponent: FC<SignUpProps> = ({ setStep }) => {
  const [formState, setFormState] = useState<User>({
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = () => {
    if (formState.password !== confirmPassword && confirmPassword !== "") {
    } else {
      UserService.register(formState);
      setStep(Step.Login);
    }
  };

  return (
    <div
      className={classNames("flex", "justify-center", "items-center", "h-full")}
    >
      <div
        className={classNames(
          "md:w-125",
          "md:h-125",
          "rounded-2xl",
          "shadow-md",
          "px-8",
          "py-8",
          "w-[90%]",
          "h-fit",
          "bg-white"
        )}
      >
        <div className={classNames("flex", "items-center", "mb-4")}>
          <Image
            src="/TichuCounter.svg"
            height={32}
            width={32}
            alt="Picture of the author"
          />
          <p className={classNames("text-rose-900")}>Tichu Counter</p>
        </div>
        <h2 className={classNames("text-3xl", "mb-2")}>Welcome to Sign Up</h2>
        <div>
          <p className={classNames("text-xs", "font-medium", "py-2")}>E-Mail</p>
          <Input
            name="email"
            value={formState.email}
            onChange={handleChange}
            className={classNames("w-full")}
          />
        </div>
        <div>
          <p className={classNames("text-xs", "font-medium", "py-2")}>
            Password
          </p>
          <Input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className={classNames("w-full")}
          />
        </div>
        <div className={classNames("mb-8")}>
          <p className={classNames("text-xs", "font-medium", "py-2")}>
            Confirm Password
          </p>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={classNames("w-full")}
          />
        </div>
        <Button className={classNames("mb-7")} onClick={() => handleRegister()}>
          Register
        </Button>
        <div className={classNames("flex", "gap-2", "flex-col", "md:flex-row")}>
          <p>Already have an account? </p>
          <a
            className={classNames("text-orange-900", "cursor-pointer")}
            onClick={() => setStep(Step.Login)}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
