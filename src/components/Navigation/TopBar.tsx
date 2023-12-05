import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import type { User } from "@/types/user";
import { getCurrentUser } from "@/services/auth.services";
import { backendUrl } from "@/services/api.services";

const TopBar: FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    };

    void fetchUser();
  }, []);

  return (
    <div
      className={classNames(
        "bg-white",
        "h-17.5",
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
          <Image
            src={backendUrl + currentUser?.image}
            alt="Profile Picture"
            className={classNames(
              "rounded-full",
              "bg-neutral-100",
              "h-9",
              "w-9"
            )}
            height={36}
            width={36}
          />
        ) : (
          <div
            className={classNames(
              "rounded-full",
              "w-9",
              "h-9",
              "bg-neutral-100"
            )}
          />
        )}
      </div>
      <span className={classNames("flex", "items-center", "pr-10", "gap-1")}>
        {currentUser?.firstname}
      </span>
    </div>
  );
};

export default TopBar;
