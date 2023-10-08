import Head from "next/head";

import styled from "styled-components";

import { EventType } from "@/helpers/types";

import Events from "@/features/events/Events";
import Loader from "@/features/ui/Loader";

const H1 = styled.h1`
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
  const res = await fetch("http://localhost:3000/api/events");

  if (!res.ok) {
    const data = await res.json();
    return {
      props: {
        error: data.message,
      },
    };
  }
  const resData = await res.json();
  const events = resData;

  return {
    props: {
      events: events.data,
    },
    revalidate: 600,
  };
}
export default EventsPage;
