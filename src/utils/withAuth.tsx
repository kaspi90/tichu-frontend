// hoc/withAuth.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import authServices from "@/services/auth.services";

type WrappedComponentType = React.ComponentType<any>;

const withAuth = (WrappedComponent: WrappedComponentType) => {
  const WithAuthComponent: React.FC<any> = (props) => {
    const Router = useRouter();

    // useEffect(() => {
    //   const token = authServices.getCurrentUser();

    //   if (!token) {
    //     Router.replace("/login"); // or wherever your login page is
    //   }
    // }, []);

    useEffect(() => {
      let isMounted = true;

      const loadUser = async () => {
        const token = await authServices.getCurrentUser();

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
