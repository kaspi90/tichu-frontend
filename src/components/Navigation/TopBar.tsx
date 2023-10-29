import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { FiChevronDown } from "react-icons/fi";
import { User, UserUpdateInput } from "@/types/user";
import authServices from "@/services/auth.services";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const TopBar = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [formData, setFormData] = useState<UserUpdateInput>({
    firstname: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    confirmPassword: "",
    password: "", // You might not want to prefill password for security reasons.
  });
  useEffect(() => {
    const fetchUser = async () => {
      const user = await authServices.getCurrentUser();
      if (user) {
        setCurrentUser(user);

        setFormData({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          confirmEmail: user.email || "",
          password: "",
          confirmPassword: "",
        });
      }
    };

    fetchUser();
  }, []);
  return (
    <div
      className={classNames(
        "bg-white",
        "h-[70px]",
        "w-full",
        "justify-end",
        "flex",
        "items-center",
        "gap-4",
        "mb-10"
      )}
    >
      <div>
        {currentUser?.image ? (
          <img
            src={backendUrl + currentUser?.image}
            alt="Profile Picture"
            className={classNames(
              "rounded-full",
              "w-[36px]",
              "h-[36px]",
              "bg-neutral-100"
            )}
          />
        ) : (
          <div
            className={classNames(
              "rounded-full",
              "w-[36px]",
              "h-[36px]",
              "bg-neutral-100"
            )}
          ></div>
        )}
      </div>
      <span className={classNames("flex", "items-center", "pr-10", "gap-1")}>
        {currentUser?.firstname}
      </span>
    </div>
  );
};

export default TopBar;
