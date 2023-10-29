import CounterOverview from "@/components/Counter/CounterOverview";
import Layout from "@/components/Layout/Layout";
import withAuth from "@/utils/withAuth";

const Dashboard = () => {
  return (
    <Layout>
      <CounterOverview />
    </Layout>
  );
};
export default withAuth(Dashboard);
