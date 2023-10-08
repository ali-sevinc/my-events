import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Head from "next/head";

import EventDetail from "@/features/events/EventDetail";
import { EventType } from "@/helpers/types";

function SingleEventPage({ event }: { event: EventType }) {
  return (
    <>
      <Head>
        <title>{event?.title || "Single Title"}</title>
        <meta
          name="description"
          content={event?.description || "Description about single event."}
        />
      </Head>
      <EventDetail event={event} />;
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const res = await fetch(`http://localhost:3000/api/events?${params?.slug}`);

  if (!res.ok)
    return {
      props: {
        event: [],
      },
    };
  const resData = await res.json();

  const data = resData?.data.find(
    (item: EventType) => item.id === params?.slug
  );
  return {
    props: {
      event: data,
    },
  };
}

export async function getStaticPaths(context: GetStaticPathsContext) {
  return {
    paths: [],
    fallback: true,
  };
}

export default SingleEventPage;
