import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Head from "next/head";

import EventDetail from "@/features/events/EventDetail";
import { EventType } from "@/helpers/types";
import { connectDB, getDatabase } from "@/helpers/db";
import Loader from "@/features/ui/Loader";
import { H1 } from ".";

interface PropsType {
  event: EventType;
  error?: string;
}

function SingleEventPage({ event, error }: PropsType) {
  if (error) return <H1>{error}</H1>;
  if (!event?.id) return <Loader />;
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
  // const { params } = context;
  // const res = await fetch(`http://localhost:3000/api/events?${params?.slug}`);

  // if (!res.ok)
  //   return {
  //     props: {
  //       event: [],
  //     },
  //   };
  // const resData = await res.json();

  // const data = resData?.data.find(
  //   (item: EventType) => item.id === params?.slug
  // );

  //directly use monogoDB

  const { params } = context;
  const slug = params?.slug;
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    return {
      props: {
        error: "Server not response..",
        event: {},
      },
    };
  }

  let data;
  try {
    const db = await getDatabase(client);
    const event = await db.collection("events").findOne({ id: slug });

    data = JSON.parse(JSON.stringify(event));

    if (!event) {
      client.close();
      return {
        props: {
          error: "Event not found..",
          event: {},
        },
      };
    }
  } catch (err) {
    return {
      props: {
        error: "Event could not loaded..",
        event: {},
      },
    };
  } finally {
    client.close();
  }

  return {
    props: {
      event: data,
    },
  };
}

export async function getStaticPaths(context: GetStaticPathsContext) {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default SingleEventPage;
