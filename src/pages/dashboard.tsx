import CounterOverview from "@/components/Counter/CounterOverview";
import Layout from "@/components/Layout/Layout";
import withAuth from "@/utils/withAuth";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <CounterOverview />
    </Layout>
  );
};

export default withAuth(Dashboard);
