import classNames from "classnames";
import { useState } from "react";
import type { ChangeEvent, FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Input from "../Forms/InputForms/InputText";
import Button from "../Buttons/button";
import type { User } from "@/types/user";
import { login } from "@/services/auth.services";
import { Step } from "@/pages/login";

type LoginProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

const LoginComponent: FC<LoginProps> = ({ setStep }) => {
  const [formState, setFormState] = useState<User>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    login(formState.email, formState.password)
      .then((response) => {
        if (response.token) {
          void router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div
      className={classNames("flex", "justify-center", "items-center", "h-full")}
    >
      <div
        className={classNames(
          "md:w-125",
          "md:h-100",
          "rounded-2xl",
          "shadow-md",
          "px-8",
          "py-8",
          "w-[90%]",
          "bg-white",
          "h-fit"
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
        <h2 className={classNames("text-3xl", "mb-2")}>Welcome to Sign In</h2>
        <div>
          <p className={classNames("text-xs", "font-medium", "py-2")}>
            E-Mail{" "}
          </p>
          <Input
            name="email"
            className={classNames("w-full")}
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className={classNames("text-xs", "font-medium", "py-2")}>
            Password
          </p>
          <Input
            type="password"
            name="password"
            className={classNames("w-full")}
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <div className={classNames("mb-3", "flex", "justify-end")}></div>
        <Button className={classNames("mb-7")} onClick={handleLogin}>
          Sign In
        </Button>
        <div className={classNames("flex", "gap-2", "flex-col", "md:flex-row")}>
          <p>Don’t have an Account? </p>
          <a
            className={classNames("text-orange-900", "cursor-pointer")}
            onClick={() => setStep(Step.Register)}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
