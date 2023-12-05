import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCurrentUser, logout } from "@/services/auth.services";
import type { User } from "@/types/user";
import { Logo } from "./NavBar";
import { backendUrl } from "@/services/api.services";

const NavBarMobile: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
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
      await logout();
      void router.push("/login");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div
      className={classNames(
        "flex",
        "w-full",
        "flex-col",
        "justify-between",
        "bg-rose-950"
      )}
    >
      <div
        className={classNames(
          "flex",
          "items-center",
          "justify-between",
          "rounded-l-xl",
          "px-10",
          "py-4"
        )}
      >
        <Logo />
        <div className={classNames("flex", "items-center", "gap-4")}>
          {currentUser?.image ? (
            <Image
              src={backendUrl + (currentUser?.image || "")}
              alt="Profile Picture"
              height={36}
              width={36}
              className={classNames(
                "rounded-full",
                "w-9",
                "h-9",
                "bg-neutral-100"
              )}
            />
          ) : (
            <div
              className={classNames(
                "rounded-full",
                "w-9",
                "h-9",
                "bg-neutral-100"
              )}
            ></div>
          )}
          <div
            className={classNames("cursor-pointer")}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Image
              src="/img/mobileMenu.svg"
              width={16}
              height={12}
              alt="Mobile Menu"
            />
          </div>
        </div>
      </div>
      <div className={classNames(showMenu ? "block" : "hidden")}>
        <div className={classNames("flex", "flex-col", "text-white")}>
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
            <Image
              src="/img/counter.svg"
              width={21}
              height={21}
              alt="Counter Icon"
            />
            Counter
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
            <Image
              src="/img/history.svg"
              width={21}
              height={21}
              alt="History Icon"
            />
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
            <Image
              src="/img/cog.svg"
              width={21}
              height={21}
              alt="Settings Icon"
            />
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
          <Image
            src="/img/logout.svg"
            width={21}
            height={21}
            alt="Logout Icon"
          />
          Log Out
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
