import classNames from "classnames";
import Layout from "@/components/Layout/Layout";
import SettingsOverview from "@/components/Settings/SettingsOverview";
import withAuth from "@/utils/withAuth";
import { NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <Layout>
      <div className={classNames("w-full", "h-fit")}>
        <SettingsOverview />
      </div>
    </Layout>
  );
};

export default withAuth(Settings);
