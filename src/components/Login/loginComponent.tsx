import classNames from "classnames";
import Image from "next/image";
import Input from "../Forms/InputForms/InputText";
import Button from "../Buttons/button";
import { ChangeEvent, FC, useState } from "react";
import { User } from "@/types/user";
import authServices from "@/services/auth.services";
import { useRouter } from "next/router";

type LoginProps = {
  setStep: React.Dispatch<React.SetStateAction<string>>;
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

  const handleLogin = async () => {
    try {
      const response = await authServices.login(
        formState.email,
        formState.password
      );
      if (response.token) {
        router.push("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <div
      className={classNames("flex", "justify-center", "items-center", "h-full")}
    >
      <div
        className={classNames(
          "md:w-[500px]",
          "md:h-[400px]",
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
        <div className={classNames("mb-3", "flex", "justify-end")}>
          {/* <a className={classNames("text-sm", "cursor-pointer", "py-3")}>
            Forgot your password?
          </a> */}
        </div>
        <Button className={classNames("mb-7")} onClick={handleLogin}>
          Sign In
        </Button>
        <div className={classNames("flex", "gap-2", "flex-col", "md:flex-row")}>
          <p>Don’t have an Account? </p>
          <a
            className={classNames("text-orange-900", "cursor-pointer")}
            onClick={() => setStep("register")}
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
