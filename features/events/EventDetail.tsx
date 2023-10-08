import Image from "next/image";
import styled from "styled-components";

import { EventType } from "@/helpers/types";
import { changeAddress, changeDate } from "@/helpers/functions";

import Loader from "../ui/Loader";

const Hero = styled.h1`
  text-align: center;
  background-color: var(--color-indigo-200);
  color: var(--color-indigo-800);
  padding: var(--size-4xl);

  text-transform: capitalize;
`;

const Container = styled.section`
  max-width: 50rem;
  background-color: var(--color-indigo-800);
  color: var(--color-gray-200);
  margin: 0 auto;
  transform: translateY(-32px);
  border-radius: var(--size-sm);
  object-fit: cover;
  text-align: center;
  padding-bottom: var(--size-2xl);
  @media (max-width: 1024px) {
    max-width: 40rem;
  }
  @media (max-width: 640px) {
    margin: 0 var(--size-md);
  }

  img {
    width: 100%;
    height: 20rem;
    border-top-left-radius: var(--size-sm);
    border-top-right-radius: var(--size-sm);
    margin: 0;
  }

  p {
    font-size: var(--size-xl);
    text-align: left;
    padding: var(--size-lg);
  }
  time {
    font-size: var(--size-lg);
    font-style: italic;
  }
  address {
    font-size: var(--size-lg);
  }
`;

function EventDetail({ event }: { event: EventType }) {
  if (!event) return <Loader />;

  return (
    <>
      <Hero>{event?.title}</Hero>
      <Container>
        <Image
          src={event?.image}
          alt={event?.title}
          width={640}
          height={480}
          priority
        />
        <p>{event?.description}</p>
        <time>{changeDate(event?.date)}</time>
        <address>
          {changeAddress(event?.address ? event.address : "...")}
        </address>
      </Container>
    </>
  );
}

export default EventDetail;
