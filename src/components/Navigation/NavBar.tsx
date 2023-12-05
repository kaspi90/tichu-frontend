import classNames from "classnames";
import React, { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/services/auth.services";

export const Logo = () => {
  return (
    <div
      className={classNames(
        "relative",
        "inline-flex",
        "items-center",
        "gap-[8px]"
      )}
    >
      <Image
        src="/img/Frame.png"
        width={32}
        height={32}
        alt="Tichu Counter Logo"
      />
      <div
        className={classNames(
          "font-text-lg-bold",
          "relative",
          "w-fit",
          "whitespace-nowrap",
          "text-[length:var(--text-lg-bold-font-size)]",
          "font-[number:var(--text-lg-bold-font-weight)]",
          "leading-[var(--text-lg-bold-line-height)]",
          "tracking-[var(--text-lg-bold-letter-spacing)]",
          "text-white",
          "[font-style:var(--text-lg-bold-font-style)]"
        )}
      >
        Tichu Counter
      </div>
    </div>
  );
};

const Box: FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    void logout();
    void router.push("/login");
  };

  return (
    <div
      className={classNames(
        "flex",
        "h-screen",
        "w-60",
        "flex-col",
        "justify-between",
        "rounded-l-xl",
        "bg-rose-950"
      )}
    >
      <div>
        <div className={classNames("flex", "rounded-l-xl", "px-10", "py-4")}>
          <Logo />
        </div>
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
        onClick={handleLogout}
      >
        <Image src="/img/logout.svg" width={21} height={21} alt="Logout Icon" />
        Log Out
      </div>
    </div>
  );
};

export default Box;
