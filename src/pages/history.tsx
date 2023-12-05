import HistoryOverview from "@/components/History/History";
import Layout from "@/components/Layout/Layout";
import withAuth from "@/utils/withAuth";
import { NextPage } from "next";

const History: NextPage = () => {
  return (
    <Layout>
      <HistoryOverview />
    </Layout>
  );
};

export default withAuth(History);
