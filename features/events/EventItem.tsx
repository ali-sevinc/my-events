import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import { changeAddress, changeDate } from "@/helpers/functions";
import { EventType } from "@/helpers/types";

const Li = styled.li`
  margin-bottom: var(--size-3xl);
  background-color: var(--color-indigo-800);
  color: var(--color-gray-200);
  max-width: 50rem;
  box-shadow: var(--shadow-md);

  @media (max-width: 1024px) {
    max-width: 40rem;
    padding-bottom: var(--size-3xl);
    text-align: center;
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: var(--size-3xl);
    @media (max-width: 1024px) {
      flex-direction: column;
      gap: var(--size-md);
    }
  }

  h2 {
    font-size: var(--size-3xl);
  }
  time {
    font-size: var(--size-lg);
    font-style: italic;
    color: var(--color-gray-400);
  }
  address {
    font-size: var(--size-lg);
  }
`;
const ImageDiv = styled.div`
  width: 50%;

  max-height: 20rem;
  overflow: hidden;
  @media (max-width: 1024px) {
    width: 100%;
  }
  img {
    width: 100%;
    object-fit: cover;
    transition: all 0.2s;
    @media (max-width: 1024px) {
      width: 100%;
    }
    &:hover {
      transform: scale(1.02);
    }
  }
`;

interface PropsType {
  event: EventType;
}

function EventItem({ event }: PropsType) {
  return (
    <Li>
      <Link href={`/events/${event.id}`}>
        <ImageDiv>
          <Image
            src={event?.image}
            width={400}
            height={320}
            alt={event.title}
            priority
          />
        </ImageDiv>
        <div>
          <h2>{event.title}</h2>
          <time>{changeDate(event.date)}</time>
          <address>{changeAddress(event.address)}</address>
        </div>
      </Link>
    </Li>
  );
}

export default EventItem;
