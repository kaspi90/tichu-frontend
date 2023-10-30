const HomePage = () => {
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
