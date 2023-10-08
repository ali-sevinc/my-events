import { getSession } from "next-auth/react";
import Head from "next/head";

import NewEvent from "@/features/events/NewEvent";

function NewEventPage() {
  return (
    <>
      <Head>
        <title>New Event</title>
        <meta name="description" content="add a new event." />
      </Head>
      <NewEvent />;
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default NewEventPage;
