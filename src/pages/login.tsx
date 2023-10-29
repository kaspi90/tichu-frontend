import classNames from "classnames";
import { useState } from "react";
import LoginComponent from "@/components/Login/loginComponent";
import SignUpComponent from "@/components/Login/signUpComponent";
import Layout from "@/components/Layout/Layout";
import withAuth from "@/utils/withAuth";

const Login = () => {
  const [step, setStep] = useState<string>("login");

  return (
    <div className={classNames("bg-red-900")}>
      <div
        className={classNames(
          "w-max-[1440px]",
          "h-screen",
          "mx-auto",
          " backdrop-blur-sm",
          "bg-white/90"
        )}
      >
        {step === "login" ? (
          <LoginComponent setStep={setStep} />
        ) : step === "register" ? (
          <SignUpComponent setStep={setStep} />
        ) : null}
      </div>
    </div>
  );
};

export default Login;
