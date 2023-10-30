import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import authServices from "@/services/auth.services";
import { useRouter } from "next/router";
import { User, UserUpdateInput } from "@/types/user";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const Logo = (): JSX.Element => {
  return (
    <div className="relative inline-flex items-center gap-[8px]">
      <Image
        src="/img/Frame.png"
        width={32}
        height={32}
        alt="Picture of the author"
      />
      <div className="font-text-lg-bold relative w-fit whitespace-nowrap text-[length:var(--text-lg-bold-font-size)] font-[number:var(--text-lg-bold-font-weight)] leading-[var(--text-lg-bold-line-height)] tracking-[var(--text-lg-bold-letter-spacing)] text-white [font-style:var(--text-lg-bold-font-style)]">
        Tichu Counter
      </div>
    </div>
  );
};

export const NavBarMobile = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
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
      try {
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
      } catch (error) {
        console.error("An error occurred while fetching the user:", error);
      }
    };

    void fetchUser();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authServices.logout();
      void router.push("/login");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div
      className={classNames(
        " flex w-full flex-col justify-between rounded-l-xl bg-rose-950"
      )}
    >
      <div className="flex  items-center justify-between rounded-l-xl px-10 py-4">
        <Logo />
        <div className={classNames("flex", "items-center", "gap-4")}>
          {currentUser?.image ? (
            <img
              src={backendUrl + (currentUser?.image || "")}
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
          <div
            className={classNames("cursor-pointer")}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Image src="/img/mobileMenu.svg" width={16} height={12} alt="" />
          </div>
        </div>
      </div>
      <div className={classNames(showMenu ? "block" : "hidden")}>
        <div className={classNames("flex flex-col text-white")}>
          <Link
            href={"dashboard"}
            className={classNames(
              "flex",
              "gap-4",
              "p-4",
              "hover:bg-rose-900",
              "rounded-xl",
              "mx-4"
            )}
          >
            <Image src="/img/cash.svg" width={21} height={21} alt="" /> Counter
          </Link>
          <Link
            href={"history"}
            className={classNames(
              "flex",
              "gap-4",
              "p-4",
              "mx-4",
              "hover:bg-rose-900",
              "rounded-xl"
            )}
          >
            <Image src="/img/duplicate.svg" width={21} height={21} alt="" />
            History
          </Link>

          <Link
            href={"settings"}
            className={classNames(
              "flex",
              "gap-4",
              "p-4",
              "mx-4",
              "hover:bg-rose-900",
              "rounded-xl"
            )}
          >
            <Image src="/img/cog.svg" width={21} height={21} alt="" />
            Settings
          </Link>
        </div>
        <div
          className={classNames(
            "flex",
            "gap-4",
            "p-4",
            "mx-4",
            "hover:bg-rose-900",
            "rounded-xl",
            "text-white",
            "cursor-pointer"
          )}
          onClick={() => handleLogout}
        >
          <Image src="/img/logout.svg" width={21} height={21} alt="" /> Log Out
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
