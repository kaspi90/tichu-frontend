import CounterOverview from "@/components/Counter/CounterOverview";
import { HistoryOverview } from "@/components/History/History";
import Layout from "@/components/Layout/Layout";
import withAuth from "@/utils/withAuth";

const History = () => {
  return (
    <Layout>
      <HistoryOverview />{" "}
    </Layout>
  );
};

export default withAuth(History);
