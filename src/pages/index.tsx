import { NextPage } from "next";

const HomePage: NextPage = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export default HomePage;
