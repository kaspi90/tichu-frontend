import CounterOverview from "@/components/Counter/CounterOverview";
import NavBar from "@/components/Navigation/NavBar";
import TopBar from "@/components/Navigation/TopBar";
import { SettingsOverview } from "@/components/Settings/SettingsOverview";
import classNames from "classnames";
import { Router, useRouter } from "next/router";
import { FC, ReactNode, useState } from "react";
import NavBarMobile from "../Navigation/NavBarMobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classNames("bg-gray-400")}>
      <div className={classNames("w-max-[1440px]", "h-fit", "mx-auto")}>
        <div className={classNames("flex")}>
          <div className={classNames("hidden", "lg:block")}>
            <NavBar />
          </div>

          <div
            className={classNames(
              "flex",
              "flex-col",
              "w-full",
              "backdrop-blur-sm",
              "bg-white/90"
            )}
          >
            <div className={classNames("lg:hidden")}>
              <NavBarMobile />
            </div>
            <div className={classNames("hidden", "lg:block")}>
              <TopBar />
            </div>

            <div
              className={classNames(
                "w-full",
                "flex",
                "justify-center",
                "items-center"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
