import classNames from "classnames";
import { useState } from "react";
import LoginComponent from "@/components/Login/loginComponent";
import SignUpComponent from "@/components/Login/signUpComponent";
import { NextPage } from "next";

export enum Step {
  Login = "login",
  Register = "register",
}

const Login: NextPage = () => {
  const [step, setStep] = useState<Step>(Step.Login);

  return (
    <div className={classNames("bg-red-900")}>
      <div
        className={classNames(
          "w-max-[1440px]",
          "h-screen",
          "mx-auto",
          "backdrop-blur-sm",
          "bg-white/90"
        )}
      >
        {step === Step.Login ? (
          <LoginComponent setStep={setStep} />
        ) : step === Step.Register ? (
          <SignUpComponent setStep={setStep} />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
