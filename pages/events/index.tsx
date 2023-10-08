import Head from "next/head";

import { connectDB, getDatabase } from "@/helpers/db";
import { EventType } from "@/helpers/types";

import styled from "styled-components";

import Events from "@/features/events/Events";
import Loader from "@/features/ui/Loader";

export const H1 = styled.h1`
  text-align: center;
  color: var(--color-indigo-800);
  margin-top: var(--size-3xl);
`;

interface PropsType {
  events: EventType[];
  error?: string;
}

function EventsPage({ events, error }: PropsType) {
  if (error) return <p>{error}</p>;
  if (!events) return <Loader />;

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="my all events." />
      </Head>
      <section>
        <H1>All Events</H1>
        <Events events={events} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  // const res = await fetch("http://localhost:3000/api/events");
  // if (!res.ok) {
  //   const data = await res.json();
  //   return {
  //     props: {
  //       error: data.message,
  //     },
  //   };
  // }
  // const resData = await res.json();
  // const events = resData;

  //directly use mobgoDB
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    return {
      props: {
        error: "Database not respose.",
        events: [],
      },
    };
  }

  let result;
  try {
    const db = await getDatabase(client);
    const collection = db.collection("events");
    result = await collection.find({}).toArray();
  } catch (error) {
    return {
      props: {
        error: "Events data could not fetch..",
        events: [],
      },
    };
  } finally {
    client.close();
  }
  const events = JSON.parse(JSON.stringify(result));

  if (!events)
    return {
      props: {
        events: [],
      },
    };
  return {
    props: {
      events: events,
    },
    revalidate: 600,
  };
}
export default EventsPage;
