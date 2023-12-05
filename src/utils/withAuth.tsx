import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/services/auth.services";

type WithAuthProps<P> = P & {};

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthComponent: React.FC<WithAuthProps<P>> = (props) => {
    const Router = useRouter();

    useEffect(() => {
      let isMounted = true;

      const loadUser = async () => {
        const token = await getCurrentUser();

        if (isMounted && !token) {
          try {
            await Router.replace("/login");
          } catch (error) {
            console.error("Redirect failed", error);
          }
        }
      };

      void loadUser();

      return () => {
        isMounted = false;
      };
    }, [Router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
