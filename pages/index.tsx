import Head from "next/head";

import Land from "@/features/layout/Land";

function HomePage() {
  return (
    <>
      <Head>
        <title>MyNextEvents Website</title>
        <meta name="description" content="Events about next and nextstar.." />
      </Head>
      <Land />;
    </>
  );
}

export default HomePage;
