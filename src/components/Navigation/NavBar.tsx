import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import authServices from "@/services/auth.services";
import { useRouter } from "next/router";

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

export const Box = (): JSX.Element => {
  const router = useRouter();

  const handleLogout = async () => {
    await authServices.logout();
    void router.push("/login");
  };
  return (
    <div
      className={classNames(
        " flex h-screen w-[240px] flex-col justify-between rounded-l-xl bg-rose-950"
      )}
    >
      <div>
        <div className="flex  rounded-l-xl px-10 py-4">
          <Logo />
        </div>
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
          "cursor-pointer" // This ensures the div looks clickable
        )}
        onClick={() => handleLogout}
      >
        <Image src="/img/logout.svg" width={21} height={21} alt="" /> Log Out
      </div>
    </div>
  );
};

export default Box;
